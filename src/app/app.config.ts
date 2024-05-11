import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "./environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {httpInterceptor} from "./core/interceptors/http/http.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import {loadingInterceptor} from "./core/interceptors/loading/loading.interceptor";
import {MessageService} from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    provideHttpClient(withInterceptors([loadingInterceptor, httpInterceptor])),
    provideAnimations(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
    ]),
    MessageService
  ]
};
