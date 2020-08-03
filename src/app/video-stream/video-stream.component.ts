import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../constants';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.forEach(param => {
      if (param.id) {
        this.id = param.id;
      }
    });
  }

  public getUrl(): string {
    return Constants.getUrl(`film/${this.id}/stream`);
  }

}
