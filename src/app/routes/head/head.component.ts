import { Component, HostListener } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  isMenuOpen = false;
  isScrolled = false;

  private isDragging = false;
  private startY = 0;
  private currentY = 0;

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

    // Previene el scroll del body SOLO mientras se arrastra el panel.
    // Esta es la forma correcta y aislada de hacerlo.
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
}
