import { TestBed } from '@angular/core/testing';

import { RecordsManagerService } from './records-manager.service';

describe('RecordsManagerService', () => {
  let service: RecordsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
