import { ɵɵinject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Use dependency injection to get an instance of the AuthService
  const userService =  ɵɵinject(UserService);
  const router = ɵɵinject(Router)
  

  if (userService.currentUser.token) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl:state.url } });
  return false; 
};