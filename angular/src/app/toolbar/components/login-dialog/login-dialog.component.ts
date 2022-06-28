import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidationConstants } from 'src/app/shared/constants/validation-constants';
import { LoginRequest } from '../../models/login-request.model';

@Component({
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  @Output() enteredCredentials = new EventEmitter<LoginRequest>();
  readonly validationConstants = ValidationConstants;
  emailTextLimit = 50;
  passwordTextLimit = 50;
  form: FormGroup;

  constructor(
    private readonly fromBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<LoginDialogComponent>
  ) {
    this.createForm();
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
    this.dialogRef.close(this.form.value);
  }
}
