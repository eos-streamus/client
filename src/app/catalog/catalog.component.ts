import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../constants';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private httpClient: HttpClient, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.httpClient.get(Constants.getUrl('films'), {
      headers: new HttpHeaders({"Authorization": `Bearer ${this.jwtService.getTokens().encodedSessionToken}`})
    }).subscribe(result => {
      console.log(result);
    })
  }

}
