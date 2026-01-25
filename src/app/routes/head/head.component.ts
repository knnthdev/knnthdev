import { Component, HostListener, OnInit } from '@angular/core';
import { ResponsiveService } from '../../tools/responsive.service';

@Component({
  selector: 'app-head',
  imports: [],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css',
})
export class HeadComponent implements OnInit {
  IsHeaderFixed: boolean = false;

  constructor(private rs: ResponsiveService) {}

  ngOnInit() {
    if (this.rs.isLoaded()) {
      window.addEventListener('scroll', this.scrollhandler.bind(this));
    }
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    if (['icon-ham', 'ham'].includes(targetElement.id)) {
      this.toggleMenuDesploy();
      return;
    }
    const deployIsShown = document
      .getElementById('desploy')
      ?.classList.contains('show');

    if (!deployIsShown) {
      return;
    }
    const elementRef = document.getElementById('monitor');
    const clickedInside = elementRef!.contains(targetElement);

    if (!clickedInside) {
      this.toggleMenuDesploy();
    }
  }

  // setTheme(theme: string | null) {
  //   if (this.rs.isLoaded() && theme) {
  //     window.localStorage.setItem('theme', theme!);
  //     document.documentElement.classList.remove('light', 'dark');
  //     document.documentElement.classList.add(theme!);
  //   }
  // }

  // getTheme(): string {
  //   if (this.rs.isLoaded()) {
  //     return window.localStorage.getItem('theme') || 'dark';
  //   }
  //   return 'undefined';
  // }

  // public toggleTheme() {
  //   if (this.getTheme() === 'dark') {
  //     this.setTheme('light');
  //   } else {
  //     this.setTheme('dark');
  //   }
  //   document.querySelector('#btn-theme')?.classList.toggle('fa-sun');
  //   document.querySelector('#btn-theme')?.classList.toggle('fa-moon');
  // }

  public toggleMenuDesploy() {
    if (this.rs.isLoaded()) {
      document.getElementById('desploy')?.classList.toggle('show');
    }
  }

  public scrollhandler(event: any) {
    if (
      document.documentElement.scrollTop > 40
    ) {
      if (this.IsHeaderFixed)
        return;

      var navbar = document.getElementById('navbar');
      navbar!.classList.add('fixed');
      this.IsHeaderFixed = true;
    } else {
      if (!this.IsHeaderFixed)
        return;

      var navbar = document.getElementById('navbar');
      navbar!.classList.remove('fixed');
      this.IsHeaderFixed = false;
    }
  }
}
