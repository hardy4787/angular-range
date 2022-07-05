import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceHelper } from 'src/app/shared';
import { LoginRequest } from '../models/login-request.model';
import { SignupRequest } from '../models/signup-request.model';
import { TokenInfo } from '../models/token-info.model';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private readonly serviceHelper: ServiceHelper) {}

  login$(body: LoginRequest): Observable<TokenInfo> {
    return this.serviceHelper.post$<TokenInfo>('api/identity/login', body);
  }

  signup$(body: SignupRequest): Observable<TokenInfo> {
    return this.serviceHelper.post$<TokenInfo>(
      'api/identity/registration',
      body
    );
  }

  refreshToken$(body: TokenInfo): Observable<TokenInfo> {
    return this.serviceHelper.post$<TokenInfo>(
      'api/identity/refresh',
      body
    );
  }

  // logout$() {
  //   return this.serviceHelper.post$(`${this.usersUrl}/signup`, null);
  // }
}
