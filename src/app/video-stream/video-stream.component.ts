import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../constants';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.forEach(param => {
      if (param.id) {
        this.id = param.id;
      }
    });
    this.autoRefreshTokenWhenExpired();
  }

  private autoRefreshTokenWhenExpired(): void {
    setTimeout(() => {
      this.authService.performRefresh().toPromise().then(_ => {
        this.autoRefreshTokenWhenExpired();
      });
    }, this.authService.getTokens().sessionToken.expiresAt - Date.now());
  }

  public getUrl(): string {
    return Constants.getUrl(`film/${this.id}/stream`);
  }

}
