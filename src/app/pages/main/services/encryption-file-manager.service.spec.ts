import { TestBed } from '@angular/core/testing';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { FileCreatorService } from 'src/app/core/services/file-creator.service';

import { EncryptionFileManagerService } from './encryption-file-manager.service';
import { RecordsManagerService } from './records-manager.service';

class FileCreatorServiceStub {}
class RecordsManagerServiceStub {}
class CryptoServiceStub {}

describe('EncryptionFileManagerService', () => {
  let service: EncryptionFileManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EncryptionFileManagerService,
        { provide: FileCreatorService, useClass: FileCreatorServiceStub },
        { provide: RecordsManagerService, useClass: RecordsManagerServiceStub },
        { provide: CryptoService, useClass: CryptoServiceStub },
      ],
    });
    service = TestBed.inject(EncryptionFileManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
