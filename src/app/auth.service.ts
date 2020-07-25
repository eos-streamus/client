import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpCient: HttpClient) { }

  performLogin(email: string, password: string): Observable<string> {
    return this.httpCient.post<string>("http://localhost:8080/login", {
      email: email,
      password: password
    });
  }
}
