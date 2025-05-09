import { Component, NO_ERRORS_SCHEMA, OnInit, QueryList } from '@angular/core';
import { BrevoService } from '../../../tools/brevo.service';
import { CheckboxRequiredValidator } from '@angular/forms';
import { catchError, map, of } from 'rxjs';

@Component({
    selector: 'app-contact',
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

        if (formData.get("chb-1") as string != null)
        {
          this.form.subject = 'Urgent Message from contact form';
        }
        
        const display = document.querySelector("#console") as HTMLElement;
        const debug: string[] = [];
        this.brevo.sendEmail(this.form).subscribe({
          next: (res) => {
            debug.push("res: " + JSON.stringify(res));
          },
          error: (err) => {
            debug.push("error: " + err.message);
          }
        });
        display.innerHTML = debug.join("<br>");
        e.preventDefault();
        
      });
    }
   }
}
