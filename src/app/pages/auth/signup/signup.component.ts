import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Router, RouterLink} from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {
  emailPattern,
  getFormValidationErrors,
  passwordPattern,
  passwordsMatchValidator
} from "../../../shared/helpers/helpers";
import {AuthService} from "../../../core/services/auth/auth.service";
import {UserService} from "../../../core/services/user/user.service";
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgOptimizedImage,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RouterLink,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router, private userService: UserService) {
    this.signupForm = this.fb.group({
      email: new FormControl('', Validators.compose(
        [Validators.required,
        Validators.pattern(emailPattern)])),
      password: new FormControl('', Validators.compose(
        [Validators.required, Validators.pattern(passwordPattern)]
      )),
      confirmPassword: new FormControl('',
        Validators.compose(
          [Validators.required, passwordsMatchValidator('password')]
        )),
      username: new FormControl('', [Validators.required]),
    })
  }
  onSignup(): void {
    this.isLoading = true;
    this.authService.emailSignup({
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
      displayName: this.signupForm.get('username')?.value
    }).then((data) => {
      if (data) {
        this.router.navigate(['/app'])
      }
    }).finally(() => this.isLoading = false);
  }

  protected readonly getFormValidationErrors = getFormValidationErrors;
}
