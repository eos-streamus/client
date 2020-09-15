import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCatalogComponent } from './playlist-catalog.component';

describe('PlaylistCatalogComponent', () => {
  let component: PlaylistCatalogComponent;
  let fixture: ComponentFixture<PlaylistCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
