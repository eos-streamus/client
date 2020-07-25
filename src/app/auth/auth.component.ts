import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @ViewChild("email") private email: ElementRef;
  @ViewChild("password") private password: ElementRef;
  errorMessage: string = null;
  success: boolean = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit() {
    this.errorMessage = null;
    this.authService.performLogin(
      this.email.nativeElement.value,
      this.password.nativeElement.value
    )
    .pipe(catchError(this.handleError<string>('')))
    .subscribe(token => {
      if (token) {
        console.log(token);
        this.success = true;
      }
    });
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.errorMessage = error.error.reason;
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
