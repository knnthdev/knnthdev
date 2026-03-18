import { Injectable } from '@angular/core';

export declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  public trackEvent(action: string, category: string, label?: string) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
  public trackRoutes(path: string) {
    gtag('config', 'G-JRQEZL0R32', {
      'page_path': path
    });
  }
  public trackOffers(plan: string) {
    this.trackEvent('offer', 'plan', plan);
  }
  public trackContact(name: string, email: string, message: string) {
    this.trackEvent('contact', 'message', `${name} - ${email} - ${message}`);
  }

  public trackButton(button: string) {
    this.trackEvent('button', 'click', button)
  }
}
