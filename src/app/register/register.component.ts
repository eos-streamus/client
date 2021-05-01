import { Component, ViewChild, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormInputComponent } from '../input/form-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent {
  @ViewChild('username') private username: FormInputComponent;
  @ViewChild('email') private email: FormInputComponent;
  @ViewChild('firstName') private firstName: FormInputComponent;
  @ViewChild('lastName') private lastName: FormInputComponent;
  @ViewChild('dateOfBirth') private dateOfBirth: FormInputComponent;
  @ViewChild('password') private password: FormInputComponent;
  @ViewChild('confirmPassword') private confirmPassword: FormInputComponent;
  @Input('authService') private authService: AuthService;

  map: Object;
  otherError: string;

  constructor(private router: Router) {
    this.resetMap();
  }

  private resetMap() {
    this.map = {
      'username': [],
      'email': [],
      'firstName': [],
      'lastName': [],
      'dateOfBirth': [],
      'password': [],
      'confirmPassword': []
    };
    this.otherError = null;
  }

  submit() {
    if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.errors = ['Passwords do not match'];
    } else {
      this.authService.performRegister({
        username: this.username.value,
        email: this.email.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        dateOfBirth: this.dateOfBirth.value,
        password: this.password.value
      })
        .subscribe(response => {
          this.resetMap();
          if (response.errors && response.errors.length > 0) {
            response.errors.forEach(error => {
              if (error.fieldName !== 'other') {
                this.map[error.fieldName].push(error.error);
              } else {
                this.otherError = error.error;
              }
            });
          } else if (response.success) {
            this.authService
            .performLogin(this.email.value, this.password.value)
            .subscribe(response => {
              if (response.success) {
                this.router.navigateByUrl('/');
              }
            })
          }
        });
    }
  }

}
