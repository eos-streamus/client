import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FormInputComponent } from './input/form-input.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { FilmCatalogComponent } from './film-catalog/film-catalog.component';
import { CookieService } from 'ngx-cookie-service';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { AuthInterceptor } from './auth-interceptor';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PlaylistCatalogComponent } from './playlist-catalog/playlist-catalog.component';
import { StreamSongCollectionComponent } from './stream-song-collection/stream-song-collection.component';
import { StreamAudioComponent } from './stream-audio/stream-audio.component';

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
    FilmCatalogComponent,
    VideoStreamComponent,
    AdminDashboardComponent,
    PlaylistCatalogComponent,
    StreamSongCollectionComponent,
    StreamAudioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [CookieService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
