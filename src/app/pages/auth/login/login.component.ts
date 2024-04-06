import { Component } from '@angular/core';
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
  isLoading: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(): void {
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.authService.loginWithEmail(this.loginForm.value).then((user) => {
      this.router.navigate(['/app'])
    }).catch((error) => {
      console.log('ERROR', error);
    }).finally(() => {
      this.isLoading = false;
    })
  }
}
