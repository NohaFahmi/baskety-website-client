import {HttpHandler, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from "../services/auth/auth.service";
import {inject} from "@angular/core";
import {Auth} from "@angular/fire/auth";
import {from, Observable, switchMap} from "rxjs";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api/v1/user') && req.method === 'POST') {
    return next(req);
  } else {
    const authService = inject(AuthService);
    const auth = inject(Auth);
    if (auth.currentUser) {
      return from(auth.currentUser.getIdToken(true)).pipe(
        switchMap(idToken => {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${idToken}`
            }
          });
          return next(authReq);
        })
      );
    } else {
      return next(req);
    }
  }
};
