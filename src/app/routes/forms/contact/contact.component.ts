import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { BrevoService } from '../../../tools/brevo.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponsiveService } from '../../../tools/responsive.service';
import { $ } from '../../../tools/extensions.module';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
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
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.required
      ],
      updateOn: 'blur'
    }),
    subject: new FormControl('Message from contact form'),
    msg: new FormControl('')
  });
  IsSubmitted = false;

  constructor(public brevo: BrevoService, private rs: ResponsiveService) {
  }

  ngOnInit(): void {
    if (this.rs.isLoaded()) {
      // if the path is /contact-me
      if ($.amIn("/contact-me"))
        this.rs.changeTheme("blue");

      $.ready(() => {
        this.v_signal();
      });
      // get the checklist checked in form
      // const debug: string[] = [];
    }
  }



  public submitForm() {
    this.v_signal();

    if (this.form.invalid)
      return;

    // debug.push("submitForm)
    this.brevo.sendEmail(this.form.value).subscribe({
      next: (res: any) => {
        this.OpenDialog();

        this.IsSubmitted = true;
        this.form.reset();
        // debug.push("res: " + JSON.stringify(res));
        // display.innerHTML = debug.join("<br>");
      },
      error: (err: any) => {
        this.IsSubmitted = false;

        this.OpenDialog();
        // debug.push("error: " + err.message);
        // display.innerHTML = debug.join("<br>");
      }
    });

  }

  public OpenDialog() {
    const dialog = document.querySelector("#dialog") as HTMLDialogElement;
    dialog.showModal();
  }

  public CloseDialog() {
    const dialog = document.querySelector("#dialog") as HTMLDialogElement;
    dialog.close();
  }

  private v_signal() {
    const name = this.form.get('name');
    const email = this.form.get('email');
    const msg = this.form.get('msg');

    const ds = {
      nameValid: $('name-valid'),
      nameInvalid: $('name-invalid'),
      emailValid: $('email-valid'),
      emailInvalid: $('email-invalid'),
      emailError: $('email-error')
    }

    const itr = [ds.nameValid, ds.nameInvalid, ds.emailValid, ds.emailInvalid, ds.emailError];

    itr.forEach(it => {
      it.hide();
    });

    if (name?.touched || email?.touched || msg?.touched || $('[type="checkbox"]').select((it) => (it as HTMLInputElement).checked ).isChecked()) {
      if (name?.invalid)
        ds.nameInvalid.show();
      else
        ds.nameValid.show();

      if (email?.invalid)
        ds.emailInvalid.show();
      else if (!$.isEmail(email?.value))
        ds.emailError.show();
      else
        ds.emailValid.show();


    }


  }
}
