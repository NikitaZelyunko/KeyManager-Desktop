import { dialog } from 'electron';
import * as fs from 'fs';
import { from, Observable, of, switchMap } from 'rxjs';

export class FileManager {
  constructor() {}

  createFile(content: string | ArrayBuffer, dialogTitle?: string) {
    return from(dialog.showSaveDialog({ title: dialogTitle })).pipe(
      switchMap((result) => {
        const filePath = result.filePath;
        if (filePath) {
          return new Observable<boolean>((subscriber) => {
            let preparedContent: string | Buffer | undefined;
            if (typeof content === 'string') {
              preparedContent = content;
            } else if (content instanceof ArrayBuffer) {
              preparedContent = Buffer.from(content);
            }
            if (typeof preparedContent !== 'undefined') {
              fs.writeFile(filePath, preparedContent, (err) => {
                if (err) {
                  console.warn('An error ocurred creating the file ' + err.message);
                  subscriber.error();
                }

                console.log('The file has been succesfully saved');
                subscriber.next(true);
                subscriber.complete();
              });
            }
          });
        }
        return of(false);
      })
    );
  }
}

const FileManagerProvider = new FileManager();

export default FileManagerProvider;
