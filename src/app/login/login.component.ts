import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("email") private email: ElementRef;
  @ViewChild("password") private password: ElementRef;
  @Input('authService') private authService: AuthService;
  errorMessage: string = null;
  success: boolean = null;

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.errorMessage = null;
    this.authService.performLogin(
      this.email.nativeElement.value,
      this.password.nativeElement.value
    )
      .subscribe(response => {
        if (response.success) {
          this.success = true
        } else {
          this.errorMessage = response.message;
        }
      });
  }
}
