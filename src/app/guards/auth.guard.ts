import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service"; // Assuming AuthService is in the services folder

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the route is the login page and the user is already logged in
    if (next.routeConfig?.path === 'login' && this.authService.isLoggedIn()) {
      // Redirect to the home page or dashboard if the user is already logged in
      this.router.navigate(['/management']); 
      return false; // Prevent navigating to the login page
    }

    // If the user is not logged in and trying to access protected routes, redirect to login
    if (!this.authService.isLoggedIn() && next.routeConfig?.path !== 'login') {
      this.router.navigate(['/login']);
      return false;
    }

    return true; // Allow access to the route if the user is logged in
  }
}
