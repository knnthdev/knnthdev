import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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

@Injectable({
  providedIn: ResponsiveService
})
export class TimeCounter {
  counter = 0;
  limit = 0;
  onPause = false;
  interval = 1;
  time_callback : Function | undefined;
  handler : NodeJS.Timeout | undefined;

  constructor() {
    this.counter = 0;
  }

  _time_handle() {
    if (!this.onPause) {
      if (this.counter >= this.limit) {
        this.time_callback?.();
        this.counter = 0;
      } else {
        this.counter++;
      }
    }
  }
  
  public setCallback(callback: Function) {
    this.time_callback = callback;
  }
  
  public start(time: number) {
    this.limit = time;
    if (this.time_callback)
      this.handler = setInterval((this._time_handle as Function).bind(this), this.interval);
  }

  public pause() {
    this.onPause = true;
  }

  public resume() {
    this.onPause = false;
  }

  public reset() {
    this.counter = 0;
    this.onPause = false;
  }

  public stop() {
    this.counter = 0;
    this.onPause = false;
    this.handler && clearInterval(this.handler);
    this.handler = undefined;
  }

}
