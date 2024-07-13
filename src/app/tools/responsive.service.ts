import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor() { }

  public isLoaded() {
    return typeof(window) !== 'undefined' && window.document && window.document.createElement;
  }

  public isMobile() {
    return window.innerWidth <= 768;
  }

}
