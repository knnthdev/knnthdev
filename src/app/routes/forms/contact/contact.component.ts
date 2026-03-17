import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ResponsiveService, BrevoService, $, TooltipDirective } from '@services';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterModule, TooltipDirective],
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

  params: { [key: string]: any } = {};

  amRoute: boolean = false;

  constructor(public brevo: BrevoService, private rs: ResponsiveService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.rs.isLoaded()) {
      // if the path is /contact-me
      if ((this.amRoute = $.amIn("/contact-me")))
        this.rs.changeTheme("blue");

      this.route.queryParams.subscribe(params => {
        this.params = params;
        if (this.params['type'] === undefined)
          return;

        const parse = `<h1>${this.params['type']}</h1>
        <p class="mt-2"><strong class="text-5xl">$${this.params['price']}</strong><span
        class="ml-2 text-secondary text-2xl font-semibold">/mes</span></p>`

          $('header').empty().append(parse);
      });

      $.ready(() => {
        this.v_signal();
      });

    }
  }

  public submitForm() {
    this.v_signal();

    if (this.form.invalid)
      return;

    const details = $('[type="checkbox"]').select((it) => (it as HTMLInputElement).checked).map((it) => { return $(it).next().text() });
    
    // Add params if there're
    if (this.params['type'] !== undefined)
      details.push(`<strong>${this.params['type']} - ${this.params['price']}</strong>`);

    this.brevo.sendEmail(this.form.value,
      )
      .subscribe({
        next: (res: any) => {
          this.OpenDialog();

          this.IsSubmitted = true;
          this.form.reset();
          this.v_signal();
        },
        error: (err: any) => {
          this.IsSubmitted = false;

          this.OpenDialog();
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

    if (name?.touched || email?.touched || msg?.touched || $('[type="checkbox"]').select((it) => (it as HTMLInputElement).checked).isChecked()) {
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

  public nameValid(): boolean {
    const name = this.form.get('name');
    return name?.valid ?? false;
  }

  public emailValid(): boolean {
    const email = this.form.get('email');
    return (email?.valid ?? false);
  }

}
