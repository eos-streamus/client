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

  performRefresh(encodedSessionJwt: string, encodedRefreshJwt: string): Observable<any> {
    return this.httpClient.post(Constants.getUrl('refresh'), {
      refreshToken: encodedRefreshJwt,
      sessionToken: encodedSessionJwt
    })
    .pipe(catchError(response => of(response)))
    .pipe(map(response => {
      localStorage.setItem('streamusSessionToken', response.sessionToken);
      localStorage.setItem('streamusRefreshToken', response.refreshToken);
      return of(response);
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
    localStorage.setItem('streamusSessionToken', response.sessionToken);
    localStorage.setItem('streamusRefreshToken', response.refreshToken);
    return new LoginResponse(true, null);
  }
}
