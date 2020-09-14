import { TestBed } from '@angular/core/testing';

import { ResourceActivityService } from './resource-activity.service';

describe('ResourceActivityService', () => {
  let service: ResourceActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
