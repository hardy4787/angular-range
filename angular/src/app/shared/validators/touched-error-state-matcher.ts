import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class TouchedErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return Boolean(control && control.invalid && (control.dirty || control.touched));
  }
}
