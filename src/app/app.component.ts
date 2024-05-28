import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'landpage';
  email = '';
  grettings = 'Hello I\'m Kenneth Briones';

  public toggleFunction() {
    const x = document.getElementById('navDemo') as HTMLElement;
    const hasShowClass = x.className.includes('w3-show');

    x.className = hasShowClass
      ? x.className.replace(/\s+w3-show/, '')
      : `${x.className} w3-show`;
  }

}
