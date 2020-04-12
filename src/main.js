const { app, BrowserWindow } = require('electron')
var spawn = require('child_process').spawn
var path = require('path')

if (require('electron-squirrel-startup')) app.exit()

var run = function (args, done) {
  var updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe')
  // debug('Spawning `%s` with args `%s`', updateExe, args);
  spawn(updateExe, args, {
    detached: true
  }).on('close', done)
}

var check = function () {
  if (process.platform === 'win32') {
    var cmd = process.argv[1]
    // debug('processing squirrel command `%s`', cmd);
    var target = path.basename(process.execPath)

    if (cmd === '--squirrel-firstrun') {
      run(['--createShortcut=' + target + ''], app.quit)
      return true
    }

    if (cmd === '--squirrel-install' || cmd === '--squirrel-updated') {
      run(['--createShortcut=' + target + ''], app.quit)
      return true
    }
    if (cmd === '--squirrel-uninstall') {
      run(['--removeShortcut=' + target + ''], app.quit)
      return true
    }
    if (cmd === '--squirrel-obsolete') {
      app.quit()
      return true
    }
  }
  return false
}

check()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // mainWindow.toggleDevTools()

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // display window until DOM loaded
  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.show()
  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
