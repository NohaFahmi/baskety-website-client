import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
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
import {passwordsMatchValidator} from "../../../shared/helpers/helpers";
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
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit{
  signupForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router, private userService: UserService) {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
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
      this.router.navigate(['/app'])
    }).finally(() => this.isLoading = false);
  }

  ngOnInit(): void {
  }
}
