import { Routes } from '@angular/router';
import {authGuard} from "./core/services/guard/auth-guard/auth.guard";
import {guestGuard} from "./core/services/guard/guest-guard/guest.guard";


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
  {
    path: 'app',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadComponent: () => import('./pages/layout/layout.component').then(c => c.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
      },
      {
        path: 'stats',
        loadComponent: () => import('./pages/stats/stats.component').then(c => c.StatsComponent),
      },
      {
        path: 'history',
        loadChildren: () => import('./pages/history/history.routes').then(routes => routes.HistoryRoutes),
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(routes => routes.AuthRoutes),
    canActivate:[guestGuard]
  },
  // TODO: add not found route
];
