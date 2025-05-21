import { Component, NO_ERRORS_SCHEMA, OnInit, QueryList } from '@angular/core';
import { BrevoService } from '../../../tools/brevo.service';
import { CheckboxRequiredValidator } from '@angular/forms';
import { catchError, map, of } from 'rxjs';

@Component({
    selector: 'app-contact',
    imports: [],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
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
IsSubmitted = false;

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
        
        // const display = document.querySelector("#console") as HTMLElement;
        // const debug: string[] = [];
        this.brevo.sendEmail(this.form).subscribe({
          next: (res) => {
            this.OpenDialog();

            handleForm.reset();
            this.IsSubmitted = true;
            // debug.push("res: " + JSON.stringify(res));
            // display.innerHTML = debug.join("<br>");
          },
          error: (err) => {
            this.IsSubmitted = false;

            this.OpenDialog();
            // debug.push("error: " + err.message);
            // display.innerHTML = debug.join("<br>");
          }
        });
        e.preventDefault();
        
      });
    }
   }

   public OpenDialog() {
    const dialog = document.querySelector("#dialog") as HTMLDialogElement;
    dialog.showModal();
   }

   public CloseDialog() {
    const dialog = document.querySelector("#dialog") as HTMLDialogElement;
    dialog.close();
   }
}
