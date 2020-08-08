import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../constants';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';
import { IconDefinition, faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  faPlay: IconDefinition = faPlay;
  films: Film[] = [];

  constructor(private httpClient: HttpClient, private jwtService: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.httpClient.get<FilmData[]>(Constants.getUrl('films'), {
      headers: new HttpHeaders({ "Authorization": `Bearer ${this.jwtService.getTokens().encodedSessionToken}` })
    }).subscribe(result => {
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
