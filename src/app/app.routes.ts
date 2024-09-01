import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/customer-list/customer-list.component').then(m => m.CustomerListComponent) 
  },
  { 
    path: 'customer/:id', 
    loadComponent: () => import('./components/customer-detail/customer-detail.component').then(m => m.CustomerDetailComponent) 
  },
  { 
    path: 'add', 
    loadComponent: () => import('./components/add-customer/add-customer.component').then(m => m.AddCustomerComponent) 
  },
  { path: '**', redirectTo: '' }
];
