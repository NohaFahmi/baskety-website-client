import {Routes} from "@angular/router";
import {guestGuard} from "../../core/services/guard/guest-guard/guest.guard";

export const HistoryRoutes: Routes = [
  {
    path: '',
    redirectTo: '/lists/history',
    pathMatch: 'full'
  },
  {
    path: 'history',
    loadComponent: () => import('./history.component').then(c => c.HistoryComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./history-list-details/history-list-details.component').then(c => c.HistoryListDetailsComponent),
  }
]
