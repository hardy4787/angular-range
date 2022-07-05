import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/account/services/token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly tokenService: TokenService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestForApis = request.url.startsWith(environment.apiUrl);
    const isLoggedIn = this.tokenService.isLoggedIn();
    if (isLoggedIn && requestForApis) {
      let session = this.tokenService.getSession();
      if (session) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + session.token,
          },
        });
      }
    }
    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
