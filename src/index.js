const { app, BrowserWindow, Menu } = require('electron');
const path = require('node:path');
const shell = require('electron').shell;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        // Open all external links in the default browser
        shell.openExternal(url);
        return { action: 'deny' }; // Prevent opening in Electron
    });
    
    mainWindow.webContents.on('will-navigate', (event, url) => {
        const currentURL = mainWindow.webContents.getURL();
        const isExternal = new URL(url).origin !== new URL(currentURL).origin;
    
        if (isExternal) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    const menuTemplate = [
        {
            label: 'File',
            submenu: [
                { label: 'Home', click: (menuItem, browserWindow) => { 
                    if (browserWindow) {
                        browserWindow.loadFile(path.join(__dirname, 'index.html')); // <-- Your new page
                    } 
                } },
                { label: 'Save', click: () => { console.log('Save clicked'); } },
                { type: 'separator' },
                { label: 'Exit', role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                {
                    label: 'Refresh',
                    accelerator: 'Ctrl+Shift+R',
                    click: (menuItem, browserWindow) => {
                        if (browserWindow) {
                            browserWindow.reload();
                        }
                    }
                }
            ]
        },
        {
            label: 'Admin',
            submenu: [
                {
                    label: 'Toggle DevTools',
                    accelerator: 'Ctrl+Shift+I', // shortcut
                    click: (menuItem, browserWindow) => {
                        if (browserWindow) {
                            browserWindow.webContents.toggleDevTools();
                        }
                    }
                }
            ]
        }
    ];
    
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu); // Sets the menu on the application

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
