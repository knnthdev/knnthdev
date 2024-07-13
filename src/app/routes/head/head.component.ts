import { Component, HostListener, OnInit } from '@angular/core';
import { ResponsiveService } from '../../tools/responsive.service';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [

  ],
  templateUrl: './head.component.html',
  styleUrl: './head.component.sass'
})
export class HeadComponent implements OnInit {

  constructor(private rs : ResponsiveService) { }

  ngOnInit() {
    this.setTheme(this.getTheme());
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
  }

  setTheme(theme:string) {
    window.localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }

  getTheme(): string {
    return window.localStorage.getItem('theme') || 'dark';
  }

  public toggleTheme() {
    if (this.getTheme() === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }

}
