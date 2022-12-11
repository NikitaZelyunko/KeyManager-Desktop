import { TestBed } from '@angular/core/testing';

import { MainEditFileService } from './main-edit-file.service';

describe('MainEditFileService', () => {
  let service: MainEditFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainEditFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
