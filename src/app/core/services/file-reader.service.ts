import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FileReaderService {
  readAsArrayBuffer(file: File) {
    return this.createFileReadSource<ArrayBuffer>((reader) => reader.readAsArrayBuffer(file));
  }

  private createFileReadSource<T extends FileReader['result']>(
    readAs: (reader: FileReader) => void
  ) {
    return new Observable<T>((subscriber) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Не понятно почему FileReader['result'] is not assignable to T | undefined
        subscriber.next(reader.result as T);
        subscriber.complete();
      };
      reader.onerror = () => {
        subscriber.error();
        subscriber.complete();
      };
      readAs(reader);
      return {
        unsubscribe() {
          reader.abort();
        },
      };
    });
  }
}
