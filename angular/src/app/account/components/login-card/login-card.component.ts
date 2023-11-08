import {
  Component, EventEmitter, OnInit, Output
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ValidationConstants } from 'src/app/shared';
import { LoginRequest } from '../../models/login-request.model';
import { IdentityService } from '../../services/identity.service';
import { TokenService } from '../../services/token.service';

@Component({
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  @Output() enteredCredentials = new EventEmitter<LoginRequest>();
  readonly validationConstants = ValidationConstants;
  emailTextLimit = 50;
  passwordTextLimit = 50;
  form: UntypedFormGroup;

  constructor(
    private readonly fromBuilder: UntypedFormBuilder,
    private readonly identityService: IdentityService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    let isLoggedIn = this.tokenService.isLoggedIn();
    console.log(`isLoggedIn: ${isLoggedIn}`);
    if (isLoggedIn) {
      this.router.navigate(['']);
    }
  }

  createForm(): void {
    this.form = this.fromBuilder.group({
      email: [
        '',
        [Validators.required, Validators.maxLength(this.emailTextLimit)],
      ],
      password: [
        '',
        [Validators.required, Validators.maxLength(this.passwordTextLimit)],
      ],
    });
  }

  onSave(): void {
    const loginRequest = {
      ...this.form.value,
    } as LoginRequest;
    this.identityService
      .login$(loginRequest)
      .pipe(
        tap((response) => {
          this.tokenService.saveSession(response);
          this.reloadPage();
        })
      )
      .subscribe();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
