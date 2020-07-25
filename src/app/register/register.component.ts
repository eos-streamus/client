import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('username') private username: ElementRef;
  @ViewChild('email') private email: ElementRef;
  @ViewChild('firstName') private firstName: ElementRef;
  @ViewChild('lastName') private lastName: ElementRef;
  @ViewChild('dateOfBirth') private dateOfBirth: ElementRef;
  @ViewChild('password') private password: ElementRef;

  map: Object;

  constructor(private authService: AuthService) {
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
      'password': []
    };
  }

  submit() {
    this.authService.performRegister({
      username: this.username.nativeElement.value,
      email: this.email.nativeElement.value,
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      dateOfBirth: this.dateOfBirth.nativeElement.value,
      password: this.password.nativeElement.value
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
