import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf("login") >= 0 || req.url.indexOf("users") >= 0 || req.url.indexOf("refresh") >= 0) {
      return next.handle(req);
    }
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${this.jwtService.getTokens().encodedSessionToken}`)
    });
    return next.handle(authReq);
  }
}