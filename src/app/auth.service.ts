import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';
import { catchError, map } from 'rxjs/operators';
import { RegisterResponse } from './responses/RegisterResponse';
import { LoginResponse } from './responses/LoginResponse';
import { Tokens } from './tokens';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private jwtService: JwtService) {
  }

  performRefresh(): Observable<Tokens> {
    return this.httpClient.post(Constants.getUrl('refresh'), this.jwtService.getTokens().serialized())
      .pipe(catchError(response => of(response)))
      .pipe(map(response => {
        const tokens = new Tokens(response.refreshToken, response.sessionToken);
        this.jwtService.saveTokens(tokens);
        setTimeout(() => {
          this.performRefresh().toPromise();
        }, tokens.sessionToken.expiresAt - Date.now());
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
      .pipe(catchError(response => {
        if (response.status == 0) {
          return of(new RegisterResponse(false, [{ fieldName: "other", error: "There was an error, please try again later." }]));
        }
        return of(new RegisterResponse(false, response.error));
      }))
      .pipe(map(this.handleRegisterResponse));
  }

  performLogin(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(Constants.getUrl('login'), {
      email: email,
      password: password
    })
      .pipe(catchError(response => {
        if (response.status == 0) {
          return of(new LoginResponse(false, "Could not establish connection, please try again later"));
        }
        return of(new LoginResponse(false, response.error.reason))
      }))
      .pipe(map(res => this.handleResponse(res)));
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
    const tokens = new Tokens(response.refreshToken, response.sessionToken);
    this.jwtService.saveTokens(tokens);
    setTimeout(() => {
      this.performRefresh();
    }, tokens.sessionToken.expiresAt - Date.now());
    return new LoginResponse(true, null);
  }

  public getTokens(): Tokens {
    return this.jwtService.getTokens();
  }
}
