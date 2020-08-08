import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Tokens } from './tokens';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  public static REFRESH_ITEM_NAME: string = 'streamusRefreshToken';
  public static SESSION_ITEM_NAME: string = 'streamusSessionToken';

  constructor(private cookieService: CookieService) { }

  public saveTokens(tokens: Tokens) : void {
    localStorage.setItem(JwtService.REFRESH_ITEM_NAME, tokens.encodedRefreshToken);
    this.cookieService.delete(JwtService.SESSION_ITEM_NAME, '/');
    this.cookieService.set(JwtService.SESSION_ITEM_NAME, tokens.encodedSessionToken, null, '/');
  }

  public getTokens(): Tokens {
    const encodedRefreshToken = localStorage.getItem(JwtService.REFRESH_ITEM_NAME);
    const encodedSessionToken = this.cookieService.get(JwtService.SESSION_ITEM_NAME);
    if (encodedRefreshToken && encodedSessionToken) {
      return new Tokens(encodedRefreshToken, encodedSessionToken);
    }
    return null;
  }
}
