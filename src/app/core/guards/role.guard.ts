import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Aca se verifica la autenticación
    if (!authService.isAuthenticated()) {
      router.navigate(['/auth'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    const userRole = authService.getCurrentRole();
    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    if (authService.isAdmin()) {

      router.navigate(['/admin']);
    } else {

      router.navigate(['/alumnos']);
    }
    return false;
  };
};

