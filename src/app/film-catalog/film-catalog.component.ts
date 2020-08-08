import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';
import { IconDefinition, faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'film-catalog',
  templateUrl: './film-catalog.component.html',
  styleUrls: ['./film-catalog.component.scss']
})
export class FilmCatalogComponent implements OnInit {
  faPlay: IconDefinition = faPlay;
  films: Film[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<FilmData[]>(Constants.getUrl('films')).subscribe(result => {
      result.forEach(filmData => {
        this.films.push(new Film(filmData));
      });
    })
  }
}

class Film {
  filmData: FilmData;

  constructor(filmData: FilmData) {
    this.filmData = filmData;
  }

  public get durationString(): string {
    const hours = Math.floor(this.filmData.duration / 3600);
    const minutes = Math.floor((this.filmData.duration - hours * 3600) / 60);
    const seconds = this.filmData.duration - hours * 3600 - minutes * 60
    let result = "";
    if (hours > 0) {
      result += `${hours}h`;
    }
    if (minutes > 0) {
      result += `${minutes}m`;
    }
    if (seconds > 0) {
      result += `${seconds}s`;
    }
    return result;
  }

}

interface FilmData {
  id: number,
  name: string,
  duration: number
}
