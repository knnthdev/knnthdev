import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { HammerModule } from '@angular/platform-browser';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection(),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    importProvidersFrom(HammerModule) // Añadido para soporte de gestos
    ]
};
