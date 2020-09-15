import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FilmCatalogComponent } from './film-catalog/film-catalog.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PlaylistCatalogComponent } from './playlist-catalog/playlist-catalog.component';

const routes: Routes = [
  { path: '', component: FilmCatalogComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'watchVideo/:id', component: VideoStreamComponent, canActivate: [AuthGuard] },
  { path: 'playlists', component: PlaylistCatalogComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
