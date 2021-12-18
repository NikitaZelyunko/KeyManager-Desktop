import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

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

  encrypt(key: CryptoKey, message: string): Observable<ArrayBuffer> {
    return from(
      window.crypto.subtle.encrypt({ name: ALGORITHM_NAME }, key, this.encodeMessage(message))
    );
  }

  decrypt(key: CryptoKey, message: string) {
    return from(
      window.crypto.subtle.decrypt({ name: ALGORITHM_NAME }, key, this.encodeMessage(message))
    );
  }

  exportKey(key: CryptoKey) {
    return from(window.crypto.subtle.exportKey('jwk', key));
  }
}
