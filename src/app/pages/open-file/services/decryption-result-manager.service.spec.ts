import { TestBed } from '@angular/core/testing';

import { DecryptionResultManagerService } from './decryption-result-manager.service';

describe('DecryptionResultManagerService', () => {
  let service: DecryptionResultManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecryptionResultManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
