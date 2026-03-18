import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgStyle } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { $, AnalyticsService } from '@services';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [CommonModule, NgStyle, RouterModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;

  private isDragging = false;
  private startY = 0;
  private currentY = 0;

  public date: Observable<Date> = interval(1000).pipe(map(()=> new Date()));

  constructor(public router: Router, public analytics: AnalyticsService) {
    interface scroll {routerEvent: NavigationEnd; position: null; anchor: null; type: any};
    router.events.subscribe((event) => {
      if ((event as scroll).routerEvent instanceof NavigationEnd) {
        if ($.amIn('/contact-me'))
          $('ref').append(`<a id="wame" class="" show-if-view="/contact-me" href="https://wa.me/50584739470"><i
            class="fa-brands fa-whatsapp"></i> Whatsapp</a>`);
        else
          $('wame').remove();
        
        this.analytics.trackRoutes((event as scroll).routerEvent.urlAfterRedirects);

      }
    });

  }

  ngOnInit(): void {
  }

  menuStyle = { transform: 'translateY(-100%)', transition: 'transform 0.4s ease-in-out' };

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateMenuPosition(true);
  }

  onTouchStart(event: TouchEvent) {
    if (!this.isMenuOpen) return;

    this.isDragging = true;
    this.startY = event.touches[0].clientY;
    this.menuStyle.transition = 'none';
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;

    event.preventDefault();

    const clientY = event.touches[0].clientY;
    this.currentY = clientY - this.startY;

    if (this.currentY > 0) {
      this.currentY = 0;
    }

    this.menuStyle.transform = `translateY(${this.currentY}px)`;
  }

  onTouchEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    const screenHeight = window.innerHeight;

    if (this.currentY < -screenHeight * 0.25) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }

    this.updateMenuPosition(true);
  }

  private updateMenuPosition(withAnimation: boolean) {
    if (withAnimation) {
      this.menuStyle.transition = 'transform 0.4s ease-in-out';
    } else {
      this.menuStyle.transition = 'none';
    }

    if (this.isMenuOpen) {
      this.menuStyle.transform = 'translateY(0)';
      this.currentY = 0;
    } else {
      this.menuStyle.transform = 'translateY(-100%)';
      this.currentY = -window.innerHeight;
    }
  }

  public amIn(path: string): boolean {
    return $.amIn(path);
  }

}

