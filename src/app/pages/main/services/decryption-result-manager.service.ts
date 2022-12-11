import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, combineLatest, map, switchMap, of, startWith } from 'rxjs';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { isPendingValue, PENDING_VALUE } from 'src/app/types/loading-value';
import { RecordListItem } from '../../main/modules/records/types/record-list-item.type';
import { KeysManagerService } from './keys-manager.service';

@Injectable()
export class DecryptionResultManagerService {
  private encryptedData$ = new BehaviorSubject<ArrayBuffer | null>(null);
  constructor(private crypto: CryptoService, private keysManager: KeysManagerService) {}

  private getEncryptedData() {
    return this.encryptedData$.pipe(filter(Boolean), startWith(PENDING_VALUE));
  }

  /**
   * Если разделить потоки файлов, чтобы они не эмитили парами, то
   * zip будет работать некорректно, т.к. пары не всегда могут организовываться, например
   * первая пара, потом замена одного из файлов не создаст пары, пока не будет заменен второй файл.
   * Или например дважды загрузить файл приватного ключа, а потом загрузить зашифрованный файл.
   * Есть следующие идеи решения такой проблемы:
   * 1) Использовать combineLatest;
   */
  getDecryptedResult() {
    return combineLatest([
      this.keysManager.getKeyFromFile('privateKey'),
      this.getEncryptedData(),
    ]).pipe(
      switchMap(([key, encryptedData]) => {
        if (isPendingValue(key) || isPendingValue(encryptedData)) {
          return of(PENDING_VALUE);
        }
        // TODO добавить уведомлений при ошибке
        return this.crypto.decrypt(key, encryptedData).pipe(
          map((result) => {
            try {
              return JSON.parse(result) as RecordListItem[];
            } catch (error) {
              console.error(error);
              return [];
            }
          }),
          startWith(PENDING_VALUE)
        );
      })
    );
  }

  setEncryptedData(data: ArrayBuffer) {
    this.encryptedData$.next(data);
  }

  reset() {
    this.encryptedData$.next(null);
  }
}
