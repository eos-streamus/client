import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants';
import { IconDefinition, faPlay } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-playlist-catalog',
  templateUrl: './playlist-catalog.component.html',
  styleUrls: ['./playlist-catalog.component.scss']
})
export class PlaylistCatalogComponent implements OnInit {
  faPlay: IconDefinition = faPlay;
  playlists: Playlist[] = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Playlist[]>(Constants.getUrl('songplaylists')).subscribe(playlists => {
      this.playlists = playlists;
    })
  }

}

export interface Playlist {
  id: number,
  name: string,
  createdAt: number,
  updatedAt: number,
  tracks: [Track]
}

export interface Track {
  id: number,
  name: string,
  duration: number,
  trackNumber: number
}
