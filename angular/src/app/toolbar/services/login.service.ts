import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceHelper } from 'src/app/shared/services/service-helper';
import { LoginRequest } from '../models/login-request.model';
import { RefreshTokenRequest } from '../models/refresh-token-request.model';
import { SignupRequest } from '../models/signup-request.model';
import { TokenResponse } from '../models/token-response.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // readonly usersUrl = 'api/users';

  constructor(private readonly serviceHelper: ServiceHelper) {}

  login$(loginRequest: LoginRequest): Observable<TokenResponse> {
    return this.serviceHelper.post$<TokenResponse>('login', loginRequest);
  }

  // signup$(signupRequest: SignupRequest) {
  //   return this.serviceHelper.post$(`${this.usersUrl}/signup`, signupRequest, {
  //     httpOptions: {
  //       responseType: 'text',
  //     },
  //   }); // response type specified, because the API response here is just a plain text (email address) not JSON
  // }

  // refreshToken$(session: RefreshTokenRequest) {
  //   let refreshTokenRequest: any = {
  //     UserId: session.userId,
  //     RefreshToken: session.refreshToken,
  //   };
  //   return this.serviceHelper.post$<TokenResponse>(
  //     `${this.usersUrl}/refresh_token`,
  //     refreshTokenRequest
  //   );
  // }

  // logout$() {
  //   return this.serviceHelper.post$(`${this.usersUrl}/signup`, null);
  // }

  // getUserInfo$(): Observable<UserResponse> {
  //   return this.serviceHelper.get$<UserResponse>(`${this.usersUrl}/info`);
  // }
}