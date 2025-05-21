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
    this.setTheme(this.getTheme());
    if (this.rs.isLoaded()) document.onscroll = this.scrollhandler;
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    if (['icon-ham', 'ham'].includes(targetElement.id)) {
      console.log(targetElement.id);
      this.toggleMenuDesploy();
      return;
    }
    console.log(targetElement.id);
    const deployIsShown = document
      .getElementById('desploy')
      ?.classList.contains('show');

    if (!deployIsShown) {
      console.log('no desplegado');
      return;
    }
    console.log('desplegado');
    const elementRef = document.getElementById('monitor');
    const clickedInside = elementRef!.contains(targetElement);

    console.log('clickedInside');
    console.log(clickedInside);
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

  public scrollhandler(event: Event) {
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
    //alert("");
  }
}
