import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamSongCollectionComponent } from './stream-song-collection.component';

describe('StreamSongCollectionComponent', () => {
  let component: StreamSongCollectionComponent;
  let fixture: ComponentFixture<StreamSongCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamSongCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamSongCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
