import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {
  login: boolean = true;
  authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit(): void {
  }

}
