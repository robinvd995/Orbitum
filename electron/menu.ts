import { app, Menu, shell, BrowserWindow } from 'electron'

export function createAppMenu(mainWindow: BrowserWindow) {
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: 'Bestand',
            submenu: [
                {
                    label: 'Open bestand…',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        // TODO: bestand dialoog openen
                        console.log('Open clicked')
                    }
                },
                { type: 'separator' },
                {
                    label: 'Afsluiten',
                    role: process.platform === 'darwin' ? 'close' : 'quit'
                }
            ]
        },
        {
            label: 'Bewerken',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Open documentatie',
                    click: () => {
                        shell.openExternal('https://mijn-app-docs.example.com')
                    }
                },
                {
                    label: 'Over',
                    click: () => {
                        mainWindow.webContents.send('show-about-dialog')
                    }
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
