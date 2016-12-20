const electron = require('electron')
const {app, BrowserWindow, Menu, Tray} = electron
const path = require('path')

let tray = null

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 600,
    height: 310,
    icon: '/icon/temp.ico',
    autoHideMenuBar: true,
    title: "JiKancolle"
  })

  win.loadURL(`file://${__dirname}/index.html`)
  //win.webContents.openDevTools()
  let image = path.join(__dirname, 'icon', 'temp.png')
  tray = new Tray( image )

  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })

  win.on('close', function(event){
    if ( !app.isQuiting){
      event.preventDefault()
      win.hide()
    }
    return false
  })

  var contextMenu = Menu.buildFromTemplate([
    {label: 'Show App', click:  function(){
      win.show();
    }},
    {label: 'Quit', click:  function(){
      app.isQuiting = true;
      app.quit();
    }}
  ])

  tray.setToolTip('JiKancolle')
  tray.setContextMenu(contextMenu)

})
