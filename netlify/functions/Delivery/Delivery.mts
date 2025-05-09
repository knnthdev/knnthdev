// netlify/functions/send-email.js
import { Handler } from "@netlify/functions";
import Brevo from "@getbrevo/brevo-node";

const apiKey = process.env.BREVO_API_KEY;

const client = new Brevo({ apiKey });

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { to, templateId, params } = body;

  try {
    const response = await client.sendTransactionalTemplate({
      templateId,
      to: [{ email: to }],
      params,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ messageId: response.messageId }),
    };
  } catch (err) {
    console.error("Brevo error:", err);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
