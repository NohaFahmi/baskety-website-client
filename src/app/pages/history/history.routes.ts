import {Routes} from "@angular/router";

export const HistoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./history.component').then(c => c.HistoryComponent)
  }
]
