import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor() { }

  public isLoaded(): boolean {
    return typeof(window) !== 'undefined';
  }

  public isMobile() {
    if (this.isLoaded())
      return window.innerWidth <= 768;
    return false;
  }

  public isDesktop() {
    if (this.isLoaded())
      return window.innerWidth > 768;
    return false;
  }

  public changeTheme(theme: string) {
    if (this.isLoaded()) {
      // Clear all ClassName of html element
      document.documentElement.className = "";
      document.documentElement.classList.add(theme);
    }
  }

}
