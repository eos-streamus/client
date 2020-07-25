import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FormInputComponent } from './input/form-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchBoxComponent,
    AuthComponent,
    RegisterComponent,
    FormInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
