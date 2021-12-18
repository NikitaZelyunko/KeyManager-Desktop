import { Injectable, NgZone } from '@angular/core';
import {
  FILE_SAVE_FAILED_EVENT_NAME,
  FILE_SAVE_REQUEST_EVENT_NAME,
  FILE_SAVE_SUCCESS_EVENT_NAME,
} from 'app/events/file-saving';
import { Observable } from 'rxjs';
import { ElectronService } from './electron.service';

@Injectable()
export class FileCreatorService {
  constructor(private electron: ElectronService, private ngZone: NgZone) {}
  createFile(content: string | ArrayBuffer, dialogTitle?: string): Observable<void> {
    return new Observable((subscriber) => {
      /** Эти коллбеки вызываются в контексте который не отслеживает ангуляр, поэтому
       * нужно сообщить ngZone что произошло некоторое событие
       */
      const successCallback = (event: Electron.IpcRendererEvent, result: boolean) => {
        this.ngZone.run(() => {
          if (result) {
            subscriber.next();
            subscriber.complete();
          }
          subscriber.error();
        });
      };
      const failCallback = () => {
        this.ngZone.run(() => {
          subscriber.error();
        });
      };
      this.electron.ipcRenderer.on(FILE_SAVE_SUCCESS_EVENT_NAME, successCallback);
      this.electron.ipcRenderer.on(FILE_SAVE_FAILED_EVENT_NAME, failCallback);
      this.electron.ipcRenderer.send(FILE_SAVE_REQUEST_EVENT_NAME, content, dialogTitle);

      return {
        unsubscribe: () => {
          this.electron.ipcRenderer.off(FILE_SAVE_SUCCESS_EVENT_NAME, successCallback);
          this.electron.ipcRenderer.off(FILE_SAVE_FAILED_EVENT_NAME, failCallback);
        },
      };
    });
  }
}
