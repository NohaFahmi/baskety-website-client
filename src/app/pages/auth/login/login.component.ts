import {Component, effect} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {NgOptimizedImage} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {emailPattern, getFormValidationErrors, passwordPattern} from "../../../shared/helpers/helpers";
import {LoadingService} from "../../../shared/services/loading/loading.service";
import {MessageService} from "primeng/api";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    NgOptimizedImage,
    RippleModule,
    RouterLink,
    ReactiveFormsModule
  ],
  providers:[HttpClient, AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService,
              protected loadingService: LoadingService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose(
        [Validators.required,
          Validators.pattern(emailPattern)])),
      password: new FormControl('', Validators.compose(
        [Validators.required, Validators.pattern(passwordPattern)]
      )),
    })
  }

  login(): void {
    this.loadingService.setLoading(true);
    this.authService.loginWithEmail(this.loginForm.value).then((user) => {
      if (user) {
        this.router.navigate(['/app']).then(() => {
          this.loadingService.setLoading(false);
          this.messageService.add({severity: 'info', summary: 'Welcome', detail: `Welcome back to Baskety App, ${user?.username ?? 'user'}!`})
        })
      }
    }).catch((error) => {
      const errorMessage = new Error(error).message;
      this.messageService.add({severity: 'error', summary: 'Error', detail: errorMessage});
    }).finally(() => {
      this.loadingService.setLoading(false);
    })
  }

    protected readonly getFormValidationErrors = getFormValidationErrors;
}
