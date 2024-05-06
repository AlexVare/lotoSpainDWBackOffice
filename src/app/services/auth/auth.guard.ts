import { Injectable, inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  CanActivate,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable, map, take, tap } from 'rxjs';
import { state } from '@angular/animations';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthClassGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getAuthToken()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
// export const AuthGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const authService = inject(AuthService);

//   if (authService.getAuthToken()) {
//     return true;
//   } else {
//     router.navigate(['login']);
//     return false;
//   }
// };
