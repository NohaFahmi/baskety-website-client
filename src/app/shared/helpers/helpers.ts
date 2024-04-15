import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const emailPattern = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$';
export const passwordPattern = '^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%^&*_~+/.])\\S{8,20}$';

function getErrorMessage(error: number): string {
  switch (error) {
    case 1:
      return `Field is required!`;
    case 2:
      return 'Invalid email format!';
    case 3:
      return 'Password must contain at least one lower case letter, one upper case letter, one number, one special character (!,@,#,$,%,^,&,*,_,~,+,/,.), no whitespace, and be between 8 and 20 characters in length!';
    case 4:
      return 'Password and confirm password must match'
    default:
      return '';
  }
}
export function passwordsMatchValidator(otherControlName?: string): ValidatorFn {
  return (control: any): ValidationErrors | null => {
    if (control?.parent?.controls && otherControlName && control?.parent?.controls[otherControlName]) {
      const otherControl: any = control?.parent?.controls[otherControlName];
      if (otherControl.value !== control.value) {
        return { 'passwordsDoNotMatch': true };
      }
    }
    return null;
  }
}

export function getFormValidationErrors(fieldControl: AbstractControl | null, otherControl?: AbstractControl): string {
  const errors = fieldControl?.errors as any;
  if (fieldControl?.touched) {
    fieldControl?.markAsDirty();
    if (errors) {
      if (errors['required']) {
        return getErrorMessage(1);
      }
      if (errors['pattern']) {
        if (errors['pattern']['requiredPattern'] === emailPattern) {
          return getErrorMessage(2);
        }
        if (errors['pattern']['requiredPattern'] === passwordPattern) {
          return getErrorMessage(3);
        }
      }
      if (errors['passwordsDoNotMatch']) {
        return getErrorMessage(4);
      }
    }
  }
  return '';
}
