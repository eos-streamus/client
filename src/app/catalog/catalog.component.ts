import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../constants';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get(Constants.getUrl('films'), {
      headers: new HttpHeaders({"authorization": `Bearer ${localStorage.getItem('streamusSessionToken')}`})
    }).subscribe(result => {
      console.log(result);
    })
  }

}
