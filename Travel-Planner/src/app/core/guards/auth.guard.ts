import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);


  
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('role');

  if (token) {
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