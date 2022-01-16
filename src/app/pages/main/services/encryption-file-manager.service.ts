import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, map, of, switchMap } from 'rxjs';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { RecordsManagerService } from 'src/app/pages/main/services/records-manager.service';

@Injectable()
export class EncryptionFileManagerService {
  constructor(private rm: RecordsManagerService, private crypto: CryptoService) {}

  createFiles() {
    return forkJoin([this.rm.getLatestRecords(), this.crypto.generateKey()]).pipe(
      switchMap(([records, keys]) => {
        if (keys.privateKey && keys.publicKey) {
          return forkJoin([this.crypto.encrypt(keys.publicKey, JSON.stringify(records)), of(keys)]);
        }
        return EMPTY;
      }),
      switchMap(([encryptedMessage, keys]) => {
        return forkJoin([
          of(window.URL.createObjectURL(new Blob([encryptedMessage], { type: 'text/plain' }))),
          keys.privateKey
            ? this.crypto
                .exportKey(keys.privateKey)
                .pipe(
                  map((key) =>
                    window.URL.createObjectURL(
                      new Blob([JSON.stringify(key)], { type: 'text/plain' })
                    )
                  )
                )
            : EMPTY,
          keys.publicKey
            ? this.crypto
                .exportKey(keys.publicKey)
                .pipe(
                  map((key) =>
                    window.URL.createObjectURL(
                      new Blob([JSON.stringify(key)], { type: 'text/plain' })
                    )
                  )
                )
            : EMPTY,
        ]);
      })
    );
  }
}
