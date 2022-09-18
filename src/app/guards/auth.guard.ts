import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean {
      // if user is authenticated then we will return true, if not then false
      // if it returns false
      if (!this.auth.isLoggedIn()) {
        // if user is not logged in then navigate to login
        this.router.navigate(['/login'])
        return false;
      }
      return this.auth.isLoggedIn();
  }
  // from here, if we will return true then only that route will be activated, otherwise that route will not activated

}
