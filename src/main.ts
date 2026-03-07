import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { $ } from 'app/tools/extensions.module';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


