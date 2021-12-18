import { TestBed } from '@angular/core/testing';

import { EncryptionFileManagerService } from './encryption-file-manager.service';

describe('EncryptionFileManagerService', () => {
  let service: EncryptionFileManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionFileManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
