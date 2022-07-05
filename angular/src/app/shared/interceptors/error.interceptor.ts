import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { ErrorResponse } from 'src/app/account/models/error-response.model';
import { IdentityService } from 'src/app/account/services/identity.service';
import { TokenService } from 'src/app/account/services/token.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  constructor(
    private readonly tokenService: TokenService,
    private readonly identityService: IdentityService,
    private readonly router: Router,
    private readonly toastrService: ToastrService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((response) =>
        console.log(JSON.stringify(response), 'ErrorInterceptor')
      ),
      catchError((error: HttpErrorResponse) => {
        console.log(JSON.stringify(error), error);
        let session = this.tokenService.getSession();
        if (
          error.status === 401 &&
          session != null &&
          !this.tokenService.isLoggedIn() &&
          !this.isRefreshingToken
        ) {
          this.isRefreshingToken = true;
          console.log('Access Token is expired, we need to renew it');
          this.toastrService.warning(
            'Access Token is expired, we need to renew it'
          );
          this.identityService.refreshToken$(session).subscribe({
            next: (data) => {
              this.toastrService.success(
                'Tokens renewed, we will save them into the local storage'
              );
              this.tokenService.saveSession(data);
            },
            error: () => {},
            complete: () => {
              this.isRefreshingToken = false;
            },
          });
        } else if (
          error.status === 400 &&
          error.error.errorCode === 'invalid_grant'
        ) {
          this.toastrService.warning(
            'the refresh token has expired, the user must login again'
          );
          this.tokenService.logout();
          this.router.navigate(['/account/login']);
        } else {
          let errorResponse: ErrorResponse = error.error;
          console.log(JSON.stringify(errorResponse));

          return throwError(() => errorResponse);
        }

        return EMPTY;
      })
    );
  }
}
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
