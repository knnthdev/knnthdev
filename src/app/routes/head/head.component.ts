import { Component, HostListener, OnInit } from '@angular/core';
import { ResponsiveService } from '../../tools/responsive.service';

@Component({
    selector: 'app-head',
    imports: [],
    templateUrl: './head.component.html',
    styleUrl: './head.component.sass'
})
export class HeadComponent implements OnInit {
  constructor(private rs: ResponsiveService) { }

  ngOnInit() {
    this.setTheme(this.getTheme());
    if (this.rs.isLoaded())
      document.body.onscroll = this.scrollhandler;
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    if (!targetElement || document.getElementById('ham')!.contains(targetElement)) {
      return;
    }
    const elementRef = document.getElementById('desploy');
    const clickedInside =
      elementRef!.contains(targetElement);

    const isHidden = !(elementRef?.classList.contains('show'));

    if (!elementRef || isHidden)
      return;

    if (!clickedInside) {
      console.log('clicked outside');
      this.toggleMenuDesploy();
    }
  }

  setTheme(theme: string | null) {
    if (this.rs.isLoaded() && theme) {
      window.localStorage.setItem('theme', theme!);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme!);
    }
  }

  getTheme(): string {
    if (this.rs.isLoaded()) {
      return window.localStorage.getItem('theme') || 'dark';
    }
    return 'undefined';
  }

  public toggleTheme() {
    if (this.getTheme() === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
    document.querySelector('#btn-theme')?.classList.toggle('fa-sun');
    document.querySelector('#btn-theme')?.classList.toggle('fa-moon');
  }

  public toggleMenuDesploy() {
    if (this.rs.isLoaded()) {
      document.getElementById('desploy')?.classList.toggle('show');
    }
  }

  public scrollhandler() {  
    var navbar = document.getElementById("navbar");
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      navbar!.classList.add("fixed");
    } else {
      navbar!.classList.remove("fixed");
    }
  }
}
