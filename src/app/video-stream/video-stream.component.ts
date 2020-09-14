import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../constants';
import { ResourceActivityService, ResourceActivity } from '../resource-activity.service';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit, AfterViewInit {
  videoId: number;
  @ViewChild('player') player: ElementRef;
  ready: boolean = false;
  activity: ResourceActivity;


  constructor(private route: ActivatedRoute, private resourceActivityService: ResourceActivityService) { }

  ngOnInit(): void {
    this.route.params.forEach(param => {
      if (param.id) {
        this.videoId = param.id;
      }
    });
  }

  ngAfterViewInit(): void {
    this.resourceActivityService.getOrStartActivityForResource(this.videoId).then(activity => {
      this.activity = activity;
      this.ready = true;
      this.player.nativeElement.currentTime = this.activity.pausedAt;
    });
  }

  timeUpdated(): void {
    const newOffset = Math.floor(this.player.nativeElement.currentTime);
    if (newOffset === this.activity.pausedAt + 1) {
      this.activity.pausedAt++;
      this.resourceActivityService.notifyUpdatedPausedAt(this.activity);
    }
  }

  public getUrl(): string {
    return Constants.getUrl(`film/${this.videoId}/stream`);
  }

}
