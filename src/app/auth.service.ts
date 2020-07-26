import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';
import { catchError, map } from 'rxjs/operators';
import { RegisterResponse } from './responses/RegisterResponse';
import { LoginResponse } from './responses/LoginResponse';

@Injectable()
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
    console.log("Updating jwtToken with " + response.token);
    localStorage.setItem('streamusToken', response.token);
    return new LoginResponse(true, null);
  }
}
