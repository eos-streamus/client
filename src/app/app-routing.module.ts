import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthGuard } from './auth.guard';
import { VideoStreamComponent } from './video-stream/video-stream.component';

const routes: Routes = [
  { path: '', component: CatalogComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'watchVideo/:id', component: VideoStreamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
