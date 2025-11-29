import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifico la autenticación
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  if (authService.isAdmin()) {
    return true;
  }

  router.navigate(['/alumnos']);
  return false;
};

