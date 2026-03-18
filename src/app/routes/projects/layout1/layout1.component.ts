import { Component, OnInit } from '@angular/core';
import { ResponsiveService, AnalyticsService } from '@services';
import { Title, Meta } from '@angular/platform-browser';


@Component({
    selector: 'app-layout1',
    imports: [],
    templateUrl: './layout1.component.html',
    styleUrl: './layout1.component.css'
})
export class Layout1Component implements OnInit {
  constructor(private rs : ResponsiveService, private title: Title, private meta: Meta, public analytics: AnalyticsService) {

  }

  ngOnInit(): void {
    const pageTitle = 'Desarrollo Web 🌐 | Planificación 🧑‍💼 y Estrategia Digital ♟️ - Kennet Briones 🤍';
    const pageDescription = 'Te ofrezco desarrollar tu sitio web e impulsarlo 🚀 en redes sociales con estrategia y optimización';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: pageDescription });

    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });

    if (this.rs.isLoaded()) {
      this.rs.changeTheme("purple");
      
    }
  }
}
