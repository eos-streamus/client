import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';

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
      .subscribe(response => {
        if (response.success) {
          this.success = true
        } else {
          this.errorMessage = response.message;
        }
      });
  }
}
