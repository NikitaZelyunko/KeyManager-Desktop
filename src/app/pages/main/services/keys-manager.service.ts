import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  switchMap,
  EMPTY,
  map,
  startWith,
  distinctUntilChanged,
} from 'rxjs';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { PENDING_VALUE } from 'src/app/types/loading-value';

type FilesNames = keyof CryptoKeyPair;
type Files = Partial<Record<FilesNames, ArrayBuffer>>;

@Injectable()
export class KeysManagerService {
  private files$ = new BehaviorSubject<Files | null>(null);
  constructor(private crypto: CryptoService) {}

  getFiles() {
    return this.files$.pipe(filter(Boolean));
  }

  getKeyFromFile(name: FilesNames) {
    return this.getFiles().pipe(
      map((files) => files[name]),
      distinctUntilChanged(),
      switchMap((file) => {
        if (file) {
          // TODO уведомить пользователя об ошибках
          return this.crypto.importKey(file, name).pipe(startWith(PENDING_VALUE));
        }
        return EMPTY;
      })
    );
  }

  setKeyFiles(files: Files) {
    this.files$.next(files);
  }

  setKeyFile(file: ArrayBuffer | undefined, name: FilesNames) {
    let files = this.files$.getValue();
    if (files) {
      files[name] = file;
    } else {
      files = { [name]: file };
    }
    this.files$.next(files);
  }
}
