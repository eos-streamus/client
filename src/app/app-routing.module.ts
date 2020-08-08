import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FilmCatalogComponent } from './film-catalog/film-catalog.component';
import { AuthGuard } from './auth.guard';
import { VideoStreamComponent } from './video-stream/video-stream.component';

const routes: Routes = [
  { path: '', component: FilmCatalogComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'watchVideo/:id', component: VideoStreamComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
