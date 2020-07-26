import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormInputComponent } from '../input/form-input.component';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('username') private username: FormInputComponent;
  @ViewChild('email') private email: FormInputComponent;
  @ViewChild('firstName') private firstName: FormInputComponent;
  @ViewChild('lastName') private lastName: FormInputComponent;
  @ViewChild('dateOfBirth') private dateOfBirth: FormInputComponent;
  @ViewChild('password') private password: FormInputComponent;
  @ViewChild('confirmPassword') private confirmPassword: FormInputComponent;
  @Input('authService') private authService: AuthService;

  map: Object;

  constructor() {
    this.resetMap();
  }

  ngOnInit(): void {
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
              this.map[error.fieldName].push(error.error);
            });
          }
        });
    }
  }

}
