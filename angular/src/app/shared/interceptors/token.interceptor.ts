import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenKey = sessionStorage.getItem('tokenKey');
    if (tokenKey) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + tokenKey,
        },
      });
    }
    return next.handle(req);
  }
}

export const AuthInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true };
