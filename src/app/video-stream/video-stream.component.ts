import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../constants';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit, AfterViewInit {
  id: number;
  activityId: number;
  @ViewChild('player') player: ElementRef;
  ready: boolean = false;
  initialOffset: number = 0;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.route.params.forEach(param => {
      if (param.id) {
        this.id = param.id;
      }
    });
  }

  ngAfterViewInit(): void {
    this.httpClient.get<{ id: number, pausedAt: number }>(Constants.getUrl(`activity/${this.id}`)).toPromise().then(res => {
      this.initialOffset = res.pausedAt;
      this.activityId = res.id;
      this.ready = true;
      if (this.player) {
        this.player.nativeElement.currentTime = this.initialOffset;
        const self = this;
        this.player.nativeElement.onpause = () => self.notifyUpdatedPausedAt();
        window.addEventListener(`beforeunload`, () => self.notifyUpdatedPausedAt());
      }
    });
  }

  private notifyUpdatedPausedAt(): void {
    this.httpClient
      .post<{ id: number, pausedAt: number }>(Constants.getUrl(`activity/${this.activityId}/pause/${Math.floor(this.player.nativeElement.currentTime)}`), null)
      .subscribe()
  }

  public getUrl(): string {
    return Constants.getUrl(`film/${this.id}/stream`);
  }

}
