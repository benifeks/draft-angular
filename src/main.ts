// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routesApp } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []), provideRouter(routesApp)],
}).catch((err) => console.error(err));
