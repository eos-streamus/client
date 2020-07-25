import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';
import { catchError, map } from 'rxjs/operators';
import { LoginResponse } from './responses/LoginResponse';
import { RegisterResponse } from './responses/RegisterResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  performRegister(data: {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    password: string
  }): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(Constants.getUrl('users'), data)
      .pipe(catchError(this.handleRegisterError))
      .pipe(map(this.handleRegisterResponse));
  }

  performLogin(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(Constants.getUrl('login'), {
      email: email,
      password: password
    })
      .pipe(catchError(this.handleLoginError))
      .pipe(map(this.handleResponse));
  }

  private handleRegisterError(response): Observable<RegisterResponse> {
    return of(new RegisterResponse(false, response.error));
  }

  private handleLoginError(httpErrorResponse): Observable<LoginResponse> {
    return of(new LoginResponse(false, httpErrorResponse.error.reason));
  }

  private handleRegisterResponse(response): RegisterResponse {
    if (response instanceof RegisterResponse) {
      return response;
    }
    return new RegisterResponse(true, null);
  }

  private handleResponse(response: any): LoginResponse {
    if (response instanceof LoginResponse) { // Received from handleLoginError
      return response;
    }
    return new LoginResponse(true, null);
  }
}
