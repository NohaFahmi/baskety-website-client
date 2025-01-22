import { HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {Auth} from "@angular/fire/auth";
import {catchError, from, switchMap, throwError} from "rxjs";
import {MessageService} from "primeng/api";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  if (req.url.includes('api/v1/user') && req.method === 'POST') {
    return next(req).pipe(
      catchError((error) => {
        if (error.status !== 200) {
          messageService.add({ severity: 'success', summary: 'Success', detail: error.message });
        }
        return throwError(() => new Error(error));
      })
    )
  } else {
    const auth = inject(Auth);
    if (auth.currentUser) {
      return from(auth.currentUser.getIdToken(true)).pipe(
        switchMap(idToken => {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${idToken}`
            }
          });
          return next(authReq).pipe(
            catchError(({error}) => {
              if (error.statusCode !== 200) {
                messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
              }
              return throwError(() => new Error(error));
            })
          )
        }),
      );
    } else {
      return next(req);
    }
  }
};
