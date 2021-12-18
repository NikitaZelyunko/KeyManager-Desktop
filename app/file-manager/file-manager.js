'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FileManager = void 0;
const electron_1 = require('electron');
const fs = require('fs');
const rxjs_1 = require('rxjs');
class FileManager {
  constructor() {}
  createFile(content, dialogTitle) {
    return (0, rxjs_1.from)(electron_1.dialog.showSaveDialog({ title: dialogTitle })).pipe(
      (0, rxjs_1.switchMap)((result) => {
        const filePath = result.filePath;
        if (filePath) {
          return new rxjs_1.Observable((subscriber) => {
            let preparedContent;
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
        return (0, rxjs_1.of)(false);
      })
    );
  }
}
exports.FileManager = FileManager;
const FileManagerProvider = new FileManager();
exports.default = FileManagerProvider;
//# sourceMappingURL=file-manager.js.map
