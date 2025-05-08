import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';

import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import * as brevo from '@getbrevo/brevo';
import { stringify } from 'node:querystring';
import { json } from 'stream/consumers';

export class BrevoService {
  instance = new brevo.TransactionalEmailsApi();
  smtpemail: brevo.SendSmtpEmail;

  constructor() {
    this.instance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env['apikey_brevo'] as string,
    );
    this.smtpemail = new brevo.SendSmtpEmail();
  }

  public async sendEmail(
    remit: { name: string; email: string },
    person: { name: string; email: string },
    subject: string,
    body: string,
  ) {
    try {
      this.smtpemail.subject = subject;
      this.smtpemail.htmlContent = body;
      this.smtpemail.sender = remit;
      this.smtpemail.to = [person];

      let res = await this.instance.sendTransacEmail(this.smtpemail);
      return 'success';
    } catch (e) {
      return e as string;
    }
  }
}
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  console.log(process.env['apikey_brevo']);
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  const brevoService = new BrevoService();

  server.engine(
    'html',
    (_, options: any, callback) => {
      commonEngine.render({
        document: indexHtml,
        url: options.req.url,
        providers: [
          { provide: APP_BASE_HREF, useValue: options.req.baseUrl },
          { provide: 'ORIGIN_URL', useValue: `${options.req.protocol}://${options.req.get('host')}` }
        ]
      }).then(html => callback(null, html))
        .catch(err => callback(err));
    }
  );
  server.use(express.json());
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  server.get('/es', (req, res) => {
    res.send('es');
  })
  server.post('/brevo', async (req, res) => {
    if (req.method === 'POST') {
        console.log(JSON.stringify(req.body));
        const { remit, person, subject, body } = req.body;
        try {
          const result = await brevoService.sendEmail(
            remit,
            person,
            subject,
            body,
          );
          res.json({ status: 'success', result });
          console.log(result)
        } catch (err: any) {
          res.status(500).json({ status: 'error', error: err.message });
          console.log(err.message)
        }
      
    } else res.send('error');
  });

  // Serve static files from /browser
  server.get(
    '**',
    express.static(browserDistFolder, { maxAge: '1y', index: 'index.html' })
  );

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 9010;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
