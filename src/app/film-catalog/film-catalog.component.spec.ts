import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCatalogComponent } from './catalog.component';

describe('FilmCatalogComponent', () => {
  let component: FilmCatalogComponent;
  let fixture: ComponentFixture<FilmCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
