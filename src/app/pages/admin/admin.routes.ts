import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    children: [
     {
       path: "",
       pathMatch: "full",
       redirectTo: "app/admin",
     },
     {
       path: "",
       loadComponent: () => import('./system-items-categories-list/system-items-categories-list.component').then(c => c.SystemItemsCategoriesListComponent),
     },
     {
       path: "items/new",
       pathMatch: "full",
       loadComponent: () => import('./add-edit-items/add-edit-items.component').then(c => c.AddEditItemsComponent),
     },
     {
       path: "items/:itemId/edit",
       loadComponent: () => import('./add-edit-items/add-edit-items.component').then(c => c.AddEditItemsComponent),  },
     {
       path: "categories/new",
       pathMatch: "full",
       loadComponent: () => import('./add-edit-categories/add-edit-categories.component').then(c => c.AddEditCategoriesComponent),
     },
     {
       path: "categories/:categoryId/new",
       loadComponent: () => import('./add-edit-categories/add-edit-categories.component').then(c => c.AddEditCategoriesComponent),
     }
   ]
  },
];
