import {
  Handler,
  HandlerContext,
  HandlerEvent,
  Handler as NetlifyHandler,
} from "@netlify/functions";
import brevo from "@getbrevo/brevo";

export class BrevoService {
  instance = new brevo.TransactionalEmailsApi();
  smtpemail: brevo.SendSmtpEmail;

  constructor(apikey: string) {
    this.instance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apikey);
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

      const res = await this.instance.sendTransacEmail(this.smtpemail);
      console.log("paquete recivido");
      return res;
    } catch (e: any) {
      console.error("Brevo error:", e);
      throw new Error("Error al enviar el email: " + e.message);
    }
  }
}

export const handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!process.env["apikey_brevo"]) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const respond = (statusCode: number, body: string) => {
    return {
      statusCode,
      body: body,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    };
  };
  if (!event.body) {
    return respond(400, "Bad Request");
  }

  const brevoService = new BrevoService(process.env["apikey_brevo"]);
  const { remit, person, subject, body } = JSON.parse(event.body || "");

  console.log({remit, person, subject, body});

  let res = respond(200, "");
  try {
    const result = await brevoService.sendEmail(remit, person, subject, body);

    res = respond(200, JSON.stringify(result));
    console.log("paquete enviado");
  } catch (err: any) {
    res = respond(500, err.message);
    console.log("error de autorización");
  }
  console.log(res);
  return res;
};
