import {Routes} from "@angular/router";
import {guestGuard} from "../../core/services/guard/guest-guard/guest.guard";

export const AuthRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent),

  }
]
