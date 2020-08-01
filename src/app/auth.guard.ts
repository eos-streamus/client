import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const encodedRefreshToken = localStorage.getItem('streamusRefreshToken');
    const encodedSessionToken = localStorage.getItem('streamusSessionToken');
    if (encodedRefreshToken && encodedSessionToken) {
      const decodedRefreshToken = jwt_decode(encodedRefreshToken);
      if (decodedRefreshToken.exp * 1000 < (new Date()).getTime()) {
        return this.router.parseUrl('auth');
      }
      const decodedSessionToken = jwt_decode(encodedSessionToken);
      if (decodedSessionToken.exp * 1000 < (new Date()).getTime()) {
        return this.authService.performRefresh(encodedSessionToken, encodedRefreshToken).toPromise().then(_ => {
          return true;
        });
      } else {
        return true;
      }
    } else {
      return this.router.parseUrl('auth');
    }
  }

}
