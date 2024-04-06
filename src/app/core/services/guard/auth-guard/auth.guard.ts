import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {tap} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLoggedIn().pipe(
    tap(isLoggedIn => {
      // If the user is not logged in, redirect them to the auth page
      if (!isLoggedIn) {
        router.navigate(['/auth']);
      }
    })
  );
};
