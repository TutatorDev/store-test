import { environment } from '../../../environments/environment';
import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, catchError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const token = localStorage.getItem(environment.appCode + '.token')?.toString() ?? 'aaaaa';
  req = req.clone({
    url: `${environment.backend}${req.url}`,
    setHeaders: {
      Authorization: `${token}`,
      'platform-seed': environment.platformSeed,
    },
  });

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          router.navigate(['/login']);
        }
        console.log(error);
      }
      return throwError(() => error);
    })
  );
};

