import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'test',
        loadComponent: () =>
        import('../test/test.component').then((m) => m.TestComponent),
      },
      {
        path: 'test2',
        loadComponent: () =>
        import('../test2/test2.component').then((m) => m.Test2Component),
      },
      {path: '', redirectTo: 'test', pathMatch: 'full'},
    ],
  },
];
