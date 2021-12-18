import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
import {
  FILE_SAVE_FAILED_EVENT_NAME,
  FILE_SAVE_REQUEST_EVENT_NAME,
  FILE_SAVE_SUCCESS_EVENT_NAME,
} from './events/file-saving';
import FileManagerProvider from './file-manager/file-manager';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createWindow(): BrowserWindow {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    // TODO изучить вопросы безопасности
    // https://www.electronjs.org/docs/latest/tutorial/security
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve ? true : false,
      contextIsolation: false, // false if you want to run e2e test with Spectron
      webSecurity: false,
    },
  });

  if (serve) {
    // win.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '/../node_modules/electron'),
    });
    win.loadURL('http://localhost:4200');
  } else {
    // note resourcesPath is common
    win.loadURL(
      url.format({
        pathname: path.join(process.resourcesPath, 'dist/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  ipcMain.on(
    FILE_SAVE_REQUEST_EVENT_NAME,
    (event, message: string | ArrayBuffer, dialogTitle?: string) => {
      FileManagerProvider.createFile(message, dialogTitle).subscribe(
        (result) => {
          event.reply(FILE_SAVE_SUCCESS_EVENT_NAME, result);
        },
        (error) => {
          event.reply(FILE_SAVE_FAILED_EVENT_NAME);
        }
      );
    }
  );

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
