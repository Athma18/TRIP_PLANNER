import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';



export const loginGuard: CanActivateFn = (route, state) => {
  

  const router=inject(Router);
  const authService=inject(AuthService);

    
  if (authService.isLoggedIn()) {
    router.navigate(['/Landing']);
    return false;
  }

  return true;

};
