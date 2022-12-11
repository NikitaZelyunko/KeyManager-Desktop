import { Injectable } from '@angular/core';
import { FilesForEncrypt } from '../../modules/files-for-encrypt-form/types/files-for-encrypt';
import { DecryptionResultManagerService } from '../../services/decryption-result-manager.service';
import { EncryptionFileManagerService } from '../../services/encryption-file-manager.service';
import { KeysManagerService } from '../../services/keys-manager.service';
import { RecordsManagerService } from '../../services/records-manager.service';
import {
  tap,
  switchMap,
  finalize,
  defer,
  EMPTY,
  of,
  startWith,
  map,
  combineLatest,
  first,
  filter,
} from 'rxjs';
import { FileInputValue } from 'src/app/ui-kit/file-input/components/file-input/file-input.component';
import { FileReaderService } from 'src/app/core/services/file-reader.service';
import { isPendingValue, PENDING_VALUE } from 'src/app/types/loading-value';

@Injectable()
export class MainEditFileService {
  constructor(
    private drm: DecryptionResultManagerService,
    private keysManager: KeysManagerService,
    private recordsService: RecordsManagerService,
    private encryptionFileManagerService: EncryptionFileManagerService,
    private fileReader: FileReaderService
  ) {}

  keyFilesUploaded() {
    return this.keysManager.getFiles().pipe(
      map((keys) => Boolean(keys.privateKey && keys.publicKey)),
      startWith(false)
    );
  }

  getRecords() {
    return this.drm.getDecryptedResult().pipe(
      tap((records) => {
        if (isPendingValue(records)) {
          return;
        }
        this.recordsService.reInit(records);
      }),
      switchMap((records) => {
        if (isPendingValue(records)) {
          return of(PENDING_VALUE);
        }
        return this.recordsService.getRecords();
      }),
      finalize(() => {
        this.drm.reset();
        this.recordsService.reset();
      })
    );
  }

  uploadFilesForDecrypt(files: FilesForEncrypt) {
    this.drm.setEncryptedData(files.data);
    this.keysManager.setKeyFile(files.private, 'privateKey');
  }

  uploadPublicKeyFile(files: FileInputValue) {
    return defer(() => {
      if (files) {
        const file = files[0];
        if (file) {
          return this.fileReader.readAsArrayBuffer(file).pipe(
            tap((file) => {
              this.keysManager.setKeyFile(file, 'publicKey');
            }),
            startWith(PENDING_VALUE)
          );
        } else {
          this.keysManager.setKeyFile(undefined, 'publicKey');
        }
      }
      return EMPTY;
    });
  }

  encryptWithNewKeys() {
    return this.encryptionFileManagerService.encryptRecords();
  }

  encryptWithOldKeys() {
    return combineLatest([
      this.keysManager
        .getKeyFromFile('privateKey')
        .pipe(filter((value): value is CryptoKey => !isPendingValue(value))),
      this.keysManager
        .getKeyFromFile('publicKey')
        .pipe(filter((value): value is CryptoKey => !isPendingValue(value))),
    ]).pipe(
      first(),
      switchMap(([privateKey, publicKey]) => {
        return this.encryptionFileManagerService.reEncryptRecords({ privateKey, publicKey });
      })
    );
  }
}
