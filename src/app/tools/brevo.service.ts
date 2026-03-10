import { Inject, Injectable } from '@angular/core';
import { withFetch, provideHttpClient, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrevoService {
  sender = {
    "name": "no-replay",
    "email": "no-replay@kennethbriones.com"
  }

  constructor(private http: HttpClient) {

  }

  public sendEmail(pack: {
    name: string;
    email: string;
    subject: string;
    msg: string;
  }, others?: string[]): Observable<any> {

    const compose = this.cardHTML(pack.name, pack.email, pack.subject, pack.msg, others || []);

    const body = {
      remit: {
        name: "knnthdev",
        email: "no-replay@kennethbriones.com"
      },
      person: {
        name: "Kenneth Briones",
        email: "knnthbriones@gmail.com"
      },
      subject: pack.subject,
      body: compose
    }

    return this.http.post('/.netlify/functions/Delivery', JSON.stringify(body));
  }

  cardHTML(Name: string, Email: string, Subject: string, Message: string, others: string[]) {
    const parseOthers = others.flatMap((it) => {
      return `<p style="padding: 8px 0;color: #333333;font-size: 11px;">🌿 ${it}</p>`;
    }
    ).join('\n\r');

    return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #2b3529; padding: 40px 0;">
    <tr>
      <td align="center">

        <!-- Tarjeta -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="background-color: #ffffff;
                      border-radius: 10px;
                      box-shadow: 0 4px 20px rgba(0,0,0,0.35);
                      overflow: hidden;">
          <tr>
            <td style="padding: 40px 50px;">

              <!-- Título -->
              <h1 style="margin: 0 0 16px 0;
                         color: #1b5e20;
                         font-size: 28px;
                         font-weight: bold;">
                ${Name}
              </h1>

              <!-- Separador -->
              <hr style="border: none; border-top: 2px solid #c8e6c9; margin: 0 0 20px 0;">

              <!-- Enviado por -->
              <p style="margin: 0 0 24px 0;
                        color: #555555;
                        font-size: 15px;">
                <strong>Enviado por:</strong>
                <a href="mailto:${Email}"
                   style="color: #2e7d32; text-decoration: none;">
                  ${Email}
                </a>
              </p>

              <h2 style="padding: 8px 0;
                color: #333333;
                font-size: 15px;
                ">
                ${Message}
              </h2>
              <!-- Lista con decoraciones -->
              <div style="margin: 0 0 24px 0;
                         display: flex;
                         justify-content: space-between;
                         "
                  ${parseOthers}
              </div>

              <!-- Separador -->
              <hr style="border: none; border-top: 2px solid #c8e6c9; margin: 0 0 20px 0;">

              <!-- Firma -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0;
                              font-size: 16px;
                              font-weight: bold;
                              color: #1b5e20;">
                      Kenneth Briones
                    </p>
                    <p style="margin: 0 0 4px 0;
                              font-size: 13px;
                              color: #777777;">
                      Marketing digital y desarrollo web
                    </p>
                    <p style="margin: 0;
                              font-size: 13px;
                              color: #777777;">
                      business@kennethbriones.com &nbsp;|&nbsp; +505 8473 9470
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Pie de página -->
          <tr>
            <td style="background-color: #1d8348;
                       padding: 16px 50px;
                       text-align: center;">
              <p style="margin: 0;
                        color: #a5d6a7;
                        font-size: 12px;">
                © 2026 www.kennethbriones.com · Todos los derechos reservados
              </p>
            </td>
          </tr>

        </table>
        <!-- Fin tarjeta -->

      </td>
    </tr>
  </table>`;
  }

}
