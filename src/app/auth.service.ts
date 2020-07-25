import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpCient: HttpClient) { }

  performLogin(email: string, password: string): Observable<Object> {
    return this.httpCient.post<Object>(Constants.getUrl('login'), {
      email: email,
      password: password
    });
  }
}
