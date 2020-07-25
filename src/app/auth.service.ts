import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpCient: HttpClient) { }

  performLogin(email: string, password: string): Observable<LoginResponse> {
    return this.httpCient.post<LoginResponse>(Constants.getUrl('login'), {
      email: email,
      password: password
    })
      .pipe(catchError(this.handleError))
      .pipe(map(this.handleResponse));
  }

  private handleError(httpErrorResponse): Observable<LoginResponse> {
    return of(new LoginResponse(false, httpErrorResponse.error.reason));
  }

  private handleResponse(response: any): LoginResponse {
    if (response instanceof LoginResponse) { // Received from handleError
      return response;
    } else {
      return new LoginResponse(true, null);
    }
  }
}

export class LoginResponse {
  private _success: boolean;
  private _message: string;

  get message(): string {
    return this._message;
  }

  get success(): boolean {
    return this._success;
  }

  constructor(success: boolean, message: string) {
    this._success = success;
    this._message = message;
  }
}