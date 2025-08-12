import { app, BrowserWindow } from 'electron'
import * as path from 'node:path'

const isDev = !app.isPackaged   // betrouwbaarder dan env-flag
let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    show: false, // eerst verborgen, tonen bij 'ready-to-show'
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (isDev) {
    const devUrl = 'http://localhost:5173'
    console.log('[electron] loading dev URL:', devUrl)
    mainWindow.loadURL(devUrl)
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    const indexPath = path.join(__dirname, '../dist/index.html')
    console.log('[electron] loading file:', indexPath)
    mainWindow.loadFile(indexPath)
  }

  // Debug hooks
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('[electron] did-finish-load')
    mainWindow?.show()
  })
  mainWindow.webContents.on('did-fail-load', (_e, code, desc, url) => {
    console.error('[electron] did-fail-load', { code, desc, url })
    mainWindow?.webContents.openDevTools({ mode: 'detach' })
    mainWindow?.show()
  })

  mainWindow.on('closed', () => { mainWindow = null })
}

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
app.whenReady().then(createWindow)