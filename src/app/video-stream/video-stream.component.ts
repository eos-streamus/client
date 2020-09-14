import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../constants';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit, AfterViewInit {
  id: number;
  @ViewChild('player') player: ElementRef;
  ready: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.forEach(param => {
      if (param.id) {
        this.id = param.id;
      }
    });
  }

  ngAfterViewInit(): void {
    ///activity/{resourceId}
    if (this.player) {
      this.player.nativeElement.onplay = this.onPlay;
      this.player.nativeElement.onpause = this.onPause;
      this.player.nativeElement.ontimeupdate = this.onTimeUpdate;
    }
  }

  private onTimeUpdate(event) {
    console.log("Time updated");
    console.log(event);
  }

  private onPlay() {
    console.log("Play");
  }

  private onPause() {
    console.log("Pause");
  }

  public getUrl(): string {
    return Constants.getUrl(`film/${this.id}/stream`);
  }

}
