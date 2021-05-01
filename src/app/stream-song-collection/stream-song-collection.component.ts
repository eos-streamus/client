import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../constants';
import { Playlist, Track } from '../playlist-catalog/playlist-catalog.component';

@Component({
  selector: 'app-stream-song-collection',
  templateUrl: './stream-song-collection.component.html',
  styleUrls: ['./stream-song-collection.component.scss']
})
export class StreamSongCollectionComponent implements OnInit {
  collectionId: number;
  playlist: Playlist;
  currentTrack: Track;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.route.params.forEach(param => {
      if (param.id) {
        this.collectionId = param.id;
      }
    });
    this.httpClient.get<Playlist>(Constants.getUrl(`songplaylist/${this.collectionId}`)).subscribe(playlist => {
      console.log(playlist);
      this.playlist = playlist;
      this.currentTrack = playlist.tracks.length > 0 ? playlist.tracks[0] : null;
    })
  }
}
