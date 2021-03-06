import { Component, ViewChild, ElementRef } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  faSearch = faSearch;
  expanded: boolean;

  @ViewChild('input') input: ElementRef;

  constructor() { }

  hideInput() {
    this.expanded = false;
  }

  expand() {
    this.expanded = true;
    (this.input.nativeElement as HTMLInputElement).focus();
  }
}
