import { Component } from '@angular/core';
import { LogoutService } from '../logout.service';
import { AuthService } from '../auth.service';
import { faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  faSignOutAlt: IconDefinition = faSignOutAlt;

  constructor(public jwtService: JwtService, private logoutService: LogoutService, private router: Router) { }

  isLoggedIn(): boolean {
    if (this.jwtService.getTokens() && this.jwtService.getTokens().sessionToken.expiresAt > Date.now()) {
      return true;
    }
    return false;
  }

  logout() {
    this.logoutService.logout().then(_ => {
      this.router.navigateByUrl('/auth');
    });
  }
}
