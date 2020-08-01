import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, Tokens } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const tokens = Tokens.getTokens();
    if (!tokens || tokens.refreshToken.expiresAt < Date.now()) {
      return this.router.parseUrl('auth');
    }
    if (tokens.sessionToken.expiresAt < Date.now()) {
      return this.authService.performRefresh().toPromise().then(_ => {
        return true;
      });
    } else {
      return true;
    }
  }

}
