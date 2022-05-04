const { app, BrowserWindow, Menu, MenuItem, ipcMain} = require('electron')  
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  win.loadFile('src/html/index.html')

  win.setMenu(null); //removes the default menu

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.



app.on('ready', function(){ 
  createWindow();
  const template = [
    {
       label: 'File',
       submenu: [
          {
             label: 'New Connection'
          },
          {
             label: 'Reconnect all Active Connections'
          },
          {
             label: 'Export to File'
          },
          {
            type: 'separator'
         },
          {
            role: 'Quit'
          }
       ]
    },
    {
      label: 'View',
      submenu: [
         { label: 'Show Quick Connect Toolbar', type: 'checkbox', checked: true, click: function(event){
            win.webContents.send('quick_connect_toolbar_toggle', event.checked);
         }},
         { type: "separator"},
         {
            role: 'reload'
         },
         {
            role: 'zoomIn'
         },
         {
          role: 'zoomOut'
       },
     {
      role: 'togglefullscreen'
   },
   {
    role: 'toggledevtools'
 },
      ]
   },
    {
       label: 'Tools',
       submenu: [
          {
             label: 'SSH File Transfer'
          },
       ]
    },
    
    {
       role: 'Help',
       submenu: [
          {
             label: 'About '
          },
          {
             label: 'Contact'
          },
       ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.