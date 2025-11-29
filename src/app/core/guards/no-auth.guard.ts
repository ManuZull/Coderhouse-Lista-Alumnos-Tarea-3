import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

// El Acceso autenticado es redirigido.
export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  // Si ya está autenticado, redirigir a la página principal
  if (authService.isAuthenticated()) {
    router.navigate(['/alumnos']);
    return false;
  }

  return true;
};

