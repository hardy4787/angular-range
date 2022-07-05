import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceHelper } from 'src/app/shared';
import { LoginRequest } from '../models/login-request.model';
import { SignupRequest } from '../models/signup-request.model';
import { TokenInfo } from '../models/token-info.model';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private readonly identityService: IdentityService) {}

  saveSession(tokenResponse: TokenInfo) {
    sessionStorage.setItem('token', tokenResponse.token);
    sessionStorage.setItem('refreshToken', tokenResponse.refreshToken);
  }

  getSession(): TokenInfo {
    if (sessionStorage.getItem('token')) {
      const tokenResponse: TokenInfo = {
        token: sessionStorage.getItem('token') || '',
        refreshToken: sessionStorage.getItem('refreshToken') || '',
      };

      return tokenResponse;
    }
    return null;
  }

  logout() {
    sessionStorage.clear();
  }

  isLoggedIn(): boolean {
    let session = this.getSession();
    if (!session) {
      return false;
    }

    const jwtToken = JSON.parse(atob(session.token.split('.')[1]));
    const tokenExpired = Date.now() > jwtToken.exp * 1000;

    return !tokenExpired;
  }

  refreshToken$(session: TokenInfo): Observable<TokenInfo> {
    return this.identityService.refreshToken$(session);
  }
}
