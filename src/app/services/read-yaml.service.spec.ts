import { TestBed } from '@angular/core/testing';

import { ReadYamlService } from './read-yaml.service';

describe('ReadYamlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadYamlService = TestBed.get(ReadYamlService);
    expect(service).toBeTruthy();
  });
});
