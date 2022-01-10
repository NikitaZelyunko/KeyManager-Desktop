import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, forkJoin, map, of, switchMap } from 'rxjs';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { RecordListItem } from '../../../records/types/record-list-item.type';

type Files = Record<'keyData' | 'encryptedData', ArrayBuffer>;

@Injectable()
export class DecryptionResultManagerService {
  private files$ = new BehaviorSubject<Files | null>(null);
  constructor(private crypto: CryptoService) {}

  private getFiles() {
    return this.files$.pipe(filter(Boolean));
  }

  getDecryptedResult() {
    return this.getFiles().pipe(
      switchMap((files) =>
        forkJoin([this.crypto.importPrivateKey(files.keyData), of(files.encryptedData)])
      ),
      switchMap(([key, encryptedData]) => this.crypto.decrypt(key, encryptedData)),
      map((result): RecordListItem[] => JSON.parse(result))
    );
  }

  pushFiles(keyData: ArrayBuffer, encryptedData: ArrayBuffer) {
    this.files$.next({ keyData, encryptedData });
  }
}
