import { TestBed } from '@angular/core/testing';

import { TagServiceService } from './tag-service.service';

describe('TagServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagServiceService = TestBed.get(TagServiceService);
    expect(service).toBeTruthy();
  });
});
