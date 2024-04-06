import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
export function passwordsMatchValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    console.log('control', control);
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { 'passwordsDoNotMatch': true };
  }
}
