'use strict';
const electron = require('electron');
const app = electron.app;
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new electron.BrowserWindow({width: 1200, height: 1000});
  //url.format({pathname: path.join(__dirname, 'index.html'),protocol: 'file:',slashes: true}
	mainWindow.loadURL(`file://${__dirname}/main.html`);
  // mainWindow.loadURL('http://localhost/Homepage/Games/Asteroids');

  mainWindow.webContents.openDevTools();// Open Dev-Tools

  mainWindow.on('closed', function () {
    mainWindow = null;// dereference
  });
}

//ready to create browser, some APIs are only after it available
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
