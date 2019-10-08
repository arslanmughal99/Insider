/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, Tray, Menu, NativeImage } from 'electron';
import { getIfaces } from './runtime/interfaces';
import { callForOpen } from './runtime/socketHandler';
import * as path from 'path';

let tray = null;
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

function makeMenu() {
  return Menu.buildFromTemplate([
    {
      label: 'exit',
      click: () => {
        app.quit();
      }
    }
  ]);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 300,
    height: 500,
    resizable: false,
    frame: false
  });

  mainWindow.setSkipTaskbar(true);
  // interfaces runtime service
  getIfaces();
  // call for open runtime service
  callForOpen();

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    tray = new Tray(`${__dirname}\\trayicon.png`);

    tray.setToolTip('Insider running ...');
    tray.setTitle('Insider');

    tray.on('click', (e, bounds) => {
      const { x, y } = bounds;
      // $FlowFixMe
      const { height, width } = mainWindow.getBounds();
      // $FlowFixMe
      if (mainWindow.isVisible()) {
        // $FlowFixMe
        mainWindow.hide();
      } else {
        // $FlowFixMe
        mainWindow.setBounds({
          x: x - Math.floor(width / 2),
          y: y - height
        });
        // $FlowFixMe
        mainWindow.show();
      }
    });

    tray.on('right-click', () => {
      tray.popUpContextMenu(makeMenu());
    });

    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.setMenu(null);
});

process.on('uncaughtException', () => {
  app.quit();
})


// $FlowFixMe
process.on('unhandledRejection', () => {
  // $FlowFixMe
  app.quit();
})
