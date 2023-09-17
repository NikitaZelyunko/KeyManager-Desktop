import { Injectable } from '@angular/core';
import { catchError, EMPTY, from, map, switchMap, forkJoin, Observable } from 'rxjs';
import { createMessageSplitter } from 'src/app/features/message-splitter/message-splitter';
import { ErrorNames } from 'src/app/utils/error-names';

const ALGORITHM_NAME = 'RSA-OAEP';

@Injectable()
export class CryptoService {
  generateKeyPair() {
    return from(
      window.crypto.subtle.generateKey(
        {
          name: ALGORITHM_NAME,
          /**
           * Длина ключа в битах.
           * Количество байт входного значения не должно превышать modulusLength / 8 - 2 * (длина хэша в байтах) - 2 https://datatracker.ietf.org/doc/html/rfc3447#section-7.1.
           * Количество байт выходного значения будет равно modulusLength / 8.
           */
          modulusLength: 4096,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-512',
        },
        true,
        ['encrypt', 'decrypt']
      )
    );
  }

  private encodeMessage(message: string) {
    const encoder = new TextEncoder();
    return encoder.encode(message);
  }

  private decodeMessage(message: BufferSource) {
    const decoder = new TextDecoder();
    return decoder.decode(message);
  }

  encrypt(key: CryptoKey, message: string): Observable<ArrayBuffer[]> {
    // В данный момент без выбора алгоритма шифрования, можно захардкодить размер блока(4096 / 8 - 2 * 512 / 8 - 2 = 382)
    const splittedMessages = createMessageSplitter(382)(this.encodeMessage(message));
    return forkJoin(
      splittedMessages.map((messageSegment) =>
        from(window.crypto.subtle.encrypt({ name: ALGORITHM_NAME }, key, messageSegment))
      )
    );
  }

  decrypt(key: CryptoKey, message: ArrayBuffer) {
    // В данный момент без выбора алгоритма шифрования, можно захардкодить размер блока это длина модуля в байтах (4096 / 8 = 512)
    const splittedMessages = createMessageSplitter(512)(new Uint8Array(message));
    return forkJoin(
      splittedMessages.map((messageSegment) =>
        from(window.crypto.subtle.decrypt({ name: ALGORITHM_NAME }, key, messageSegment))
      )
    ).pipe(
      // TODO обработать ошибки(если это возможно) несовпадения ключа и зашифрованных данных
      catchError((error: DOMException) => {
        console.error(error);
        switch (error.name) {
          case ErrorNames.OPERATION_ERROR:
            {
              // TODO уведомить пользователя
              // TODO может быть нужно пробрасывать ошибки наружу, но в более удобоваримом виде
            }
            break;
        }
        return EMPTY;
      }),
      switchMap((result) => from(new Blob(result).arrayBuffer())),
      map((result) => {
        return this.decodeMessage(result);
      })
    );
  }

  exportKey(key: CryptoKey) {
    return from(window.crypto.subtle.exportKey('jwk', key));
  }

  importKey(keyData: ArrayBuffer, type: keyof CryptoKeyPair) {
    try {
      const jsonKey: JsonWebKey = JSON.parse(this.decodeMessage(keyData));
      return from(
        window.crypto.subtle.importKey(
          'jwk',
          jsonKey,
          {
            name: ALGORITHM_NAME,
            hash: 'SHA-512',
          },
          true,
          type === 'privateKey' ? ['decrypt'] : ['encrypt']
        )
      ).pipe(
        catchError((err) => {
          // TODO обработать ошибки и пробросить в более удобоваримом виде наружу
          console.error(err);
          return EMPTY;
        })
      );
    } catch (error) {
      console.error(error);
      return EMPTY;
    }
  }

  importPrivateKey(keyData: ArrayBuffer) {
    return this.importKey(keyData, 'privateKey');
  }

  importPublicKey(keyData: ArrayBuffer) {
    return this.importKey(keyData, 'publicKey');
  }
}
