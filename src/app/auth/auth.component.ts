import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @ViewChild("email") private email: ElementRef;
  @ViewChild("password") private password: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.email.nativeElement.value);
    console.log(this.password.nativeElement.value);
  }

}
