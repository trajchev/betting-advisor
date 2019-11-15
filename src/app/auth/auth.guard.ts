import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        // Get user authentication status from service (boolean)
        const isAuth = this.authService.getIsAuth();
        // Redirect to login if user is not authenticated
        if (!isAuth) {
            this.router.navigate(['/login']);
        }
            return isAuth;
        }
}
