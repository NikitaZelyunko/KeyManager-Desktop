import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, map, of, switchMap } from 'rxjs';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { RecordsManagerService } from 'src/app/pages/main/services/records-manager.service';
import { DataForEncrypt } from '../types/data-for-encrypt';
import { RecordListItem } from '../modules/records/types/record-list-item.type';
import { createSimpleSaltGenerator } from 'src/app/features/salt-generator/simple-salt-generator';

@Injectable()
export class EncryptionFileManagerService {
  constructor(private rm: RecordsManagerService, private crypto: CryptoService) {}

  reEncryptRecords(keys: CryptoKeyPair) {
    return this.rm.getLatestRecords().pipe(
      switchMap((records) => {
        if (keys.privateKey && keys.publicKey) {
          const dataForEncrypt: DataForEncrypt<RecordListItem[]> = {
            value: records,
            salt: createSimpleSaltGenerator()(),
          };
          return forkJoin([
            this.crypto.encrypt(keys.publicKey, JSON.stringify(dataForEncrypt)),
            of(keys),
          ]);
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

  encryptRecords() {
    return this.crypto.generateKeyPair().pipe(switchMap((keys) => this.reEncryptRecords(keys)));
  }
}
