import { TestBed } from '@angular/core/testing';

import { FileCreatorService } from './file-creator.service';

describe('FileCreatorService', () => {
  let service: FileCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
