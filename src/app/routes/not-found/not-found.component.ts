import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformServer }                       from '@angular/common';
import { RESPONSE_INIT }                          from '@angular/core';  // <— token de nuevo SSR

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(RESPONSE_INIT) private responseInit: ResponseInit  // <— inyecta ResponseInit
  ) {}

  ngOnInit(): void {
    // Sólo en SSR, cambia el código de estado a 404
    if (isPlatformServer(this.platformId)) {
      this.responseInit.status = 404;
    }
  }
}
