import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpBackend, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthInterceptor } from './core/services/auth.interceptor';

const httpLoaderFactory = (http: HttpBackend): TranslateHttpLoader =>
  new TranslateHttpLoader(new HttpClient(http), './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpBackend],
      },
  })),
  ],
};
