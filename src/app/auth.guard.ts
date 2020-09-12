import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const tokens = this.authService.getTokens();
    if (!tokens || tokens.refreshToken.expiresAt < Date.now()) {
      return this.router.parseUrl('auth');
    } else if (tokens && tokens.sessionToken.expiresAt < Date.now()) {
      return this.authService.performRefresh().toPromise().then(_ => {
        return true;
      }).catch(error => {
        console.error(error);
        return this.router.parseUrl('auth');
      });
    }
    return true;
  }

}
