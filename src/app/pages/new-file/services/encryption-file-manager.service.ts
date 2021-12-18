import { Injectable } from '@angular/core';
import { concat, EMPTY, forkJoin, of, switchMap } from 'rxjs';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { FileCreatorService } from 'src/app/core/services/file-creator.service';
import { RecordsManagerService } from './records-manager.service';

@Injectable()
export class EncryptionFileManagerService {
  constructor(
    private fc: FileCreatorService,
    private rm: RecordsManagerService,
    private crypto: CryptoService
  ) {}

  createFile() {
    return forkJoin([this.rm.getLatestRecords(), this.crypto.generateKey()]).pipe(
      switchMap(([records, keys]) => {
        if (keys.privateKey && keys.publicKey) {
          return forkJoin([this.crypto.encrypt(keys.publicKey, JSON.stringify(records)), of(keys)]);
        }
        return EMPTY;
      }),
      switchMap(([encryptedMessage, keys]) => {
        return concat(
          this.fc.createFile(encryptedMessage, 'Зашифрованный файл'),
          keys.privateKey
            ? this.crypto
                .exportKey(keys.privateKey)
                .pipe(switchMap((key) => this.fc.createFile(JSON.stringify(key), 'Приватный ключ')))
            : EMPTY,
          keys.publicKey
            ? this.crypto
                .exportKey(keys.publicKey)
                .pipe(switchMap((key) => this.fc.createFile(JSON.stringify(key), 'Публичный ключ')))
            : EMPTY
        );
      })
    );
  }
}
