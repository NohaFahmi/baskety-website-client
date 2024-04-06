import {CanActivateFn, CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {map, tap} from "rxjs";

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLoggedIn().pipe(
    tap(isLoggedIn => {
      if (isLoggedIn) {
        router.navigate(['/app/home']);
      }
    }),
    map(isLoggedIn => !isLoggedIn)
  );
};
