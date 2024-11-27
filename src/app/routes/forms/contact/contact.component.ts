import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { BrevoService } from '../../../tools/brevo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.sass',
  schemas: [NO_ERRORS_SCHEMA]
})
export class ContactComponent implements OnInit {
  email = 'knnthbriones@gmail.com';
  form = {
    name: '',
    email: '',
    subject: '',
    msg: ''
  };

  constructor(public brevo: BrevoService) {

   }

   ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const handleForm = document.querySelector("#contact-form") as HTMLFormElement;
      handleForm.addEventListener("submit", (e) => {
        const formData = new FormData(handleForm);
        this.form = {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          subject: 'Message from contact form',
          msg: formData.get("message") as string,
        }
        
        //const debug = document.querySelector("#console") as HTMLElement;
        this.brevo.sendEmail(this.form);
        e.preventDefault();
        
      });
    }
   }
}
