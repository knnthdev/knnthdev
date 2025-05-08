// functions/ssr.js
import { createRequestHandler } from '@angular/ssr';
import { APP_BASE_HREF }        from '@angular/common';
import * as path                from 'path';
import { fileURLToPath }        from 'url';
import bootstrap                from '../dist/knnthdev/server/main.js';

const __filename        = fileURLToPath(import.meta.url);
const __dirname         = path.dirname(__filename);
const browserDist       = path.join(__dirname, '../dist/knnthdev/browser');
const indexHtml         = path.join(browserDist, 'index.html');

export const handler = createRequestHandler({
  bootstrap,
  inlineCriticalCss: false,  // opcional: ajusta según performance
  // carpeta para servir estáticos
  documentRoot: browserDist,
  // fallback a index.html
  appShellUrl: '/index.html',
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
});
