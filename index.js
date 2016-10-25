var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var path = require('path');
var iconFile = path.join(__dirname, '..' , 'icon.png');

// electron is started with au script
if (process.env.RUN_WITH_AU === 'true') {
  iconFile = path.join(__dirname, 'electron', 'resources', 'icons', '128x128.png');
  // enable reload
  var reloadFile = path.join(__dirname, 'tools', 'reload.electron');
  require('electron-reload')(reloadFile);
}

var app = electron.app;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function () {
  var bounds = { 
    width: 993, 
    height: 600 
  };
  bounds.icon = electron.nativeImage.createFromPath(iconFile);

  var mainWindow = new BrowserWindow(bounds);

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
