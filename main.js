const { app, BrowserWindow, ipcMain } = require('electron')
// app: controls application's event lifecycle.
// BrowserWindow, which creates and manages app windows.
require('update-electron-app')()
// this auto updates based on github releases and repo name
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong') // before rendering the html

  createWindow()
  
  // in mac : create new widow when app icon is clicked and when all windows are closed
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// quit app in windows and linux
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

