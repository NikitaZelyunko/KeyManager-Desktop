import { TestBed } from '@angular/core/testing';
import { CryptoService } from 'src/app/core/services/crypto.service';

import { DecryptionResultManagerService } from './decryption-result-manager.service';

class CryptoServiceStub {}

describe('DecryptionResultManagerService', () => {
  let service: DecryptionResultManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DecryptionResultManagerService,
        { provide: CryptoService, useClass: CryptoServiceStub },
      ],
    });
    service = TestBed.inject(DecryptionResultManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
