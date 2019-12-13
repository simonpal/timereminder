'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path')
const url = require('url');

//require('electron-reload')(__dirname);
 
function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });
  // For debuggning
  //win.webContents.openDevTools()
  // and load the index.html of the app.
  
  //For distribution
  //win.loadFile('dist/index.html');
  
  //For developement
  win.loadFile('index.html');
  

  win.on('closed', () => {
    win = null;
  });

}
 
app.on('ready', createWindow);