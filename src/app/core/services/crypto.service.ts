import { Injectable } from '@angular/core';
import { catchError, EMPTY, from, map, Observable } from 'rxjs';

const ALGORITHM_NAME = 'RSA-OAEP';

@Injectable()
export class CryptoService {
  generateKey() {
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
    return from(window.crypto.subtle.decrypt({ name: ALGORITHM_NAME }, key, message)).pipe(
      map((result: BufferSource) => this.decodeMessage(result))
    );
  }

  exportKey(key: CryptoKey) {
    return from(window.crypto.subtle.exportKey('jwk', key));
  }

  importPrivateKey(keyData: ArrayBuffer) {
    const jsonKey: JsonWebKey = JSON.parse(this.decodeMessage(keyData));
    return from(
      window.crypto.subtle.importKey(
        'jwk',
        jsonKey,
        {
          name: ALGORITHM_NAME,
          hash: 'SHA-512',
        },
        false,
        ['decrypt']
      )
    ).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
