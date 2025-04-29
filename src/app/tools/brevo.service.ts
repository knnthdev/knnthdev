import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}) : Observable<any> {

  const compose = `
  <h1>Mensaje Recibido</h1>
    <h3>Nombre: ${pack.name}</h3>
    <p>Email: ${pack.email}</p>
    <p>Asunto: ${pack.subject}</p>
    <br>
    ${pack.msg}
  `;

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
    
    return this.http.post('/brevo', JSON.stringify(body));
  }

}
