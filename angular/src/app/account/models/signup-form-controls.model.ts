import { FormControl } from "@angular/forms";

export interface SignupFormControls {
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
}
