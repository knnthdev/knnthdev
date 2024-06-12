import { Component, OnInit, HostListener } from '@angular/core';
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
  grettings = "Hello I'm Kenneth Briones";
  menuIsopen = false;

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    if (this.menuIsopen) {
      if (!targetElement) {
        return;
      }

      if (targetElement.id !== 'ham' && targetElement.tagName !== 'I') {
        this.toggleFunction();
      }
    }
  }

  public toggleFunction() {
    const x = document.getElementById('navDemo') as HTMLElement;
    this.menuIsopen = x.classList.toggle('w3-show');
  }
}
