import {Routes} from "@angular/router";

export const HistoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./history.component').then(c => c.HistoryComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./history-list-details/history-list-details.component').then(c => c.HistoryListDetailsComponent)
  }
]
