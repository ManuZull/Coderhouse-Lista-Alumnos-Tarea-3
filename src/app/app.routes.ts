import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [noAuthGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'alumnos',
    canActivate: [authGuard],
    loadChildren: () => import('./features/alumnos/alumnos.routes').then(m => m.alumnosRoutes)
  },
  {
    path: 'cursos',
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  {
    path: 'inscripciones',
    canActivate: [authGuard],
    loadChildren: () => import('./features/inscripciones/inscripciones.routes').then(m => m.inscripcionesRoutes)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth'
  }
];
