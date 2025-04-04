import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() ) {
    const userType = authService.getUserType();
    
    if (userType === 'traveller') {
      return true;
    }
    
    if (userType === 'admin') {
      router.navigate(['/Admin']);
      return false;
    }
  }


  router.navigate(['']);
  return false;
};