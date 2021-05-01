import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Constants } from '../constants';

@Component({
  selector: 'app-stream-audio',
  templateUrl: './stream-audio.component.html',
  styleUrls: ['./stream-audio.component.scss']
})
export class StreamAudioComponent implements OnInit {

  @ViewChild('player') player: ElementRef;
  @Input('audioId') audioId: number;

  ngOnInit(): void {
  }

  public getUrl(): string {
    return Constants.getUrl(`song/${this.audioId}`);
  }

}
