import { Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.routes').then(m => m.routes),
    title: 'ECOBRIX-Login'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes),
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path        : '**',
    pathMatch   : 'full',
    component   : NotFoundComponent
  }
];
