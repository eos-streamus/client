import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FormInputComponent } from './input/form-input.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchBoxComponent,
    LoginComponent,
    RegisterComponent,
    FormInputComponent,
    LoginComponent,
    AuthComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    CookieService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
