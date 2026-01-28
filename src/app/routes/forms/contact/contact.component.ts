import { Component, NO_ERRORS_SCHEMA, OnInit, QueryList } from '@angular/core';
import { BrevoService } from '../../../tools/brevo.service';
import { CheckboxRequiredValidator } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { ResponsiveService } from '../../../tools/responsive.service';

@Component({
    selector: 'app-contact',
    imports: [],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
    schemas: [NO_ERRORS_SCHEMA]
})
export class ContactComponent implements OnInit {
  email = 'knnthdev@gmail.com';

  checklist = [
    "Estoy interesado en el plan económico",
    "Hablame más del plan profesional",
    "¿Qué es el plan Inversores y cómo funciona?",
    "Solo busco getión de redes sociales",
    "Busco crear un sitio web",
    "Leí tu post",
    "Me urge"
  ];
  form = {
    name: '',
    email: '',
    subject: '',
    msg: ''
  };
IsSubmitted = false;

  constructor(public brevo: BrevoService, private rs: ResponsiveService) {
  }

   ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // if the path is /contact-me
      if (window.location.pathname == "/contact-me")
        this.rs.changeTheme("blue");

      const handleForm = document.querySelector("#contact-form") as HTMLFormElement;
      handleForm.addEventListener("submit", (e) => {
        const formData = new FormData(handleForm);
        this.form = {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          subject: 'Message from contact form',
          msg: formData.get("message") as string,
        }

        // get the checklist checked in form
        for (let i = 0; i < this.checklist.length; i++) {
          if (formData.get(this.checklist[i]) as string != null)
          {
            this.form.msg += '\n' + this.checklist[i];
          }
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
