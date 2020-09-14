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
  id: number;
  @ViewChild('player') player: ElementRef;
  ready: boolean = false;

  activity: ResourceActivity;

  constructor(private route: ActivatedRoute, private resourceActivityService: ResourceActivityService) { }

  ngOnInit(): void {
    this.route.params.forEach(param => {
      if (param.id) {
        this.id = param.id;
      }
    });
  }

  ngAfterViewInit(): void {
    this.resourceActivityService.getOrStartActivityForResource(this.id).then(activity => {
      this.activity = activity;
      this.ready = true;
      this.player.nativeElement.currentTime = this.activity.pausedAt;
      const self = this;
      this.player.nativeElement.ontimeupdate = () => {
        const newOffset = Math.floor(self.player.nativeElement.currentTime);
        if (newOffset === self.activity.pausedAt + 1) {
          self.activity.pausedAt++;
          self.resourceActivityService.notifyUpdatedPausedAt(self.activity);
        }
      };
    });
  }

  public getUrl(): string {
    return Constants.getUrl(`film/${this.id}/stream`);
  }

}
