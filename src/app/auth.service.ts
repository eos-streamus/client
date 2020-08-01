import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';
import { catchError, map } from 'rxjs/operators';
import { RegisterResponse } from './responses/RegisterResponse';
import { LoginResponse } from './responses/LoginResponse';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  performRefresh(): Observable<Tokens> {
    return this.httpClient.post(Constants.getUrl('refresh'), Tokens.getTokens().serialized())
      .pipe(catchError(response => of(response)))
      .pipe(map(response => {
        const tokens = new Tokens(response.refreshToken, response.sessionToken);
        tokens.save();
        return tokens;
      }));
  }

  performRegister(data: {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    password: string
  }): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(Constants.getUrl('users'), data)
      .pipe(catchError(response => of(new RegisterResponse(false, response.error))))
      .pipe(map(this.handleRegisterResponse));
  }

  performLogin(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(Constants.getUrl('login'), {
      email: email,
      password: password
    })
      .pipe(catchError(response => of(new LoginResponse(false, response.error.reason))))
      .pipe(map(this.handleResponse));
  }

  private handleRegisterResponse(response: any): RegisterResponse {
    if (response instanceof RegisterResponse) { // Received from handleRegisterError
      return response;
    }
    return new RegisterResponse(true, null, response);
  }

  private handleResponse(response: any): LoginResponse {
    if (response instanceof LoginResponse) { // Received from handleLoginError
      return response;
    }
    new Tokens(response.refreshToken, response.sessionToken).save();
    return new LoginResponse(true, null);
  }
}

export class Tokens {
  private static REFRESH_ITEM_NAME: string = 'streamusRefreshToken';
  private static SESSION_ITEM_NAME: string = 'streamusSessionToken';
  private _encodedRefreshToken: string;
  private _encodedSessionToken: string;

  public constructor(encodedRefreshToken: string, encodedSessionToken: string) {
    // Must be valid tokens. Throws an exception if it is not the case.
    jwt_decode(encodedRefreshToken);
    jwt_decode(encodedSessionToken);
    this._encodedRefreshToken = encodedRefreshToken;
    this._encodedSessionToken = encodedSessionToken;
  }

  public get encodedRefreshToken(): string {
    return this._encodedRefreshToken;
  }

  public get encodedSessionToken(): string {
    return this._encodedSessionToken;
  }

  public get refreshToken(): Token {
    const decoded = jwt_decode(this.encodedRefreshToken);
    return {
      expiresAt: decoded.exp * 1000,
      issuedAt: decoded.iat * 1000,
      id: decoded.jti,
      userId: decoded.userId
    };
  }

  public get sessionToken(): Token {
    const decoded = jwt_decode(this.encodedSessionToken);
    return {
      email: decoded.email,
      expiresAt: decoded.exp * 1000,
      issuedAt: decoded.iat * 1000,
      id: decoded.jti,
      userId: decoded.userId
    };
  }

  public save(): void {
    localStorage.setItem(Tokens.REFRESH_ITEM_NAME, this.encodedRefreshToken);
    localStorage.setItem(Tokens.SESSION_ITEM_NAME, this.encodedSessionToken);
  }

  public serialized(): { refreshToken: string, sessionToken: string} {
    return {
      refreshToken: this.encodedRefreshToken,
      sessionToken: this.encodedSessionToken
    }
  }

  static getTokens(): Tokens {
    const encodedRefreshToken = localStorage.getItem(Tokens.REFRESH_ITEM_NAME);
    const encodedSessionToken = localStorage.getItem(Tokens.SESSION_ITEM_NAME);
    if (encodedRefreshToken && encodedSessionToken) {
      return new Tokens(encodedRefreshToken, encodedSessionToken);
    }
    return null;
  }
}

export interface Token {
  email?: string, expiresAt: number, issuedAt: number, id: string, userId: number
}
