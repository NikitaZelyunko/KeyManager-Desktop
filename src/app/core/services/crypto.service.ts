import { Injectable } from '@angular/core';
import { catchError, EMPTY, from, map, Observable } from 'rxjs';
import { ErrorNames } from 'src/app/utils/error-names';

const ALGORITHM_NAME = 'RSA-OAEP';

@Injectable()
export class CryptoService {
  generateKeyPair() {
    return from(
      window.crypto.subtle.generateKey(
        {
          name: ALGORITHM_NAME,
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

  encrypt(key: CryptoKey, message: string): Observable<ArrayBuffer> {
    return from(
      window.crypto.subtle.encrypt({ name: ALGORITHM_NAME }, key, this.encodeMessage(message))
    );
  }

  decrypt(key: CryptoKey, message: BufferSource) {
    return from(
      window.crypto.subtle.decrypt({ name: ALGORITHM_NAME }, key, message) as Promise<BufferSource>
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
