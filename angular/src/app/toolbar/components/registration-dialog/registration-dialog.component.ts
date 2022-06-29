import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormValidators, ValidationConstants } from 'src/app/shared';
import { LoginRequest } from '../../models/login-request.model';

@Component({
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationDialogComponent {
  @Output() enteredCredentials = new EventEmitter<LoginRequest>();
  readonly validationConstants = ValidationConstants;
  emailTextLimit = 50;
  firstNameTextLimit = 50;
  lastNameTextLimit = 50;
  passwordTextLimit = 50;
  form: FormGroup;

  constructor(
    private readonly fromBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<RegistrationDialogComponent>
  ) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fromBuilder.group(
      {
        firstName: ['', Validators.maxLength(this.firstNameTextLimit)],
        lastName: ['', Validators.maxLength(this.lastNameTextLimit)],
        email: [
          '',
          [Validators.required, Validators.maxLength(this.emailTextLimit)],
        ],
        password: [
          '',
          [Validators.required, Validators.maxLength(this.passwordTextLimit)],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: FormValidators.match('password', 'confirmPassword') }
    );
  }

  onSave(): void {
    this.dialogRef.close(this.form.value);
  }
}
