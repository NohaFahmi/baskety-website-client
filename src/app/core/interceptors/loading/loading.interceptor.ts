import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {LoadingService} from "../../../shared/services/loading/loading.service";
import {finalize} from "rxjs";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";

let totalRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  totalRequests++;
  loadingService.setLoading(true);
  return next(req).pipe(finalize(() => {
    totalRequests--;
    if (totalRequests === 0) {
      loadingService.setLoading(false);
    }
  }
  ));
};
