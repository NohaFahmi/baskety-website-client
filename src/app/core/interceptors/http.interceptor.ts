import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from "../services/auth/auth.service";
import {inject} from "@angular/core";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api/v1/user') && req.method === 'POST') {
    return next(req);
  } else {
    const authService = inject(AuthService);
    const authToken = authService.getAccessToken();
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }
};
