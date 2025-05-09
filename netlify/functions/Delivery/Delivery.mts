// netlify/functions/send-email.js
import { Handler, HandlerContext, HandlerEvent, Handler as NetlifyHandler } from "@netlify/functions";
import brevo from "@getbrevo/brevo";

export class BrevoService {
  instance = new brevo.TransactionalEmailsApi();
  smtpemail: brevo.SendSmtpEmail;

  constructor(apikey: string) {
    this.instance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      apikey
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
      return "success";
    } catch (e) {
      return e as string;
    }
  }
}

export const handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!process.env["apikey_brevo"]) {
    return { statusCode: 500, body: "Internal Server Error" };
  }

  const respond = (statusCode: number, body: string) => {
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };
  };
  if (!event.body) {
    return respond(400, "Bad Request");
  }

  const brevoService = new BrevoService(process.env["apikey_brevo"]);
  const { remit, person, subject, body } = JSON.parse(event.body || '');
  let res = respond(200, '');
  try {
    const result = await brevoService.sendEmail(remit, person, subject, body);
    res = respond(200, result);
    console.log(result);
  } catch (err: any) {
    res = respond(500, err.message);
    console.log(err.message);
  }
  return res;
};
