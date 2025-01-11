import { Routes } from '@angular/router';
import {authGuard} from "./core/services/guard/auth-guard/auth.guard";
import {guestGuard} from "./core/services/guard/guest-guard/guest.guard";
import {adminRoutes} from "./pages/admin/admin.routes";


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
      // {
      //   path: 'stats',
      //   loadComponent: () => import('./pages/stats/stats.component').then(c => c.StatsComponent),
      // },
      {
        path: 'history',
        loadComponent: () => import('./pages/history/history.component').then(c => c.HistoryComponent),
      },
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then(m => m.adminRoutes),
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
