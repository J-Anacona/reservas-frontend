import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

// Solo con sesión iniciada
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.estaLogueado()) return true;

  return router.createUrlTree(['/login']);
};

// Solo para Barbero
export const barberoGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.estaLogueado()) return router.createUrlTree(['/login']);
  if (auth.esBarbero()) return true;

  return router.createUrlTree(['/citas']);
};