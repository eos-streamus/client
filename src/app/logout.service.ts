import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private cookieService: CookieService) { }

  logout(): Promise<boolean> {
    return new Promise(resolve => {
      this.cookieService.delete(JwtService.SESSION_ITEM_NAME, '/');
      localStorage.removeItem(JwtService.REFRESH_ITEM_NAME);
      resolve(true);
    });
  }
}
