import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { ErrorResponse } from 'src/app/account/models/error-response.model';
import { TokenInfo } from 'src/app/account/models/token-info.model';
import { TokenService } from 'src/app/account/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly tokenService: TokenService,
    private readonly toastrService: ToastrService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let session = this.tokenService.getSession();
    if (session == null) {
      this.router.navigate(['/account/login']);
      return false;
    }

    if (!this.tokenService.isLoggedIn()) {
      this.toastrService.warning(`Session is expired.`);
      return this.checkSession$(session);
    }
    return true;
  }

  checkSession$(session: TokenInfo): Observable<boolean> {
    return this.tokenService.refreshToken$(session).pipe(
      map((data) => {
        console.log(`refreshToken response is ${JSON.stringify(data)}`);
        this.tokenService.saveSession(data);
        return true;
      }),
      catchError((error: ErrorResponse) => {
        console.log(`inside checkSession ${JSON.stringify(error)}`);
        this.router.navigate(['/account//login']);
        return EMPTY;
      })
    );
  }
}
