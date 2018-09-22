const electron = require('electron');
const url = require('url');
const path = require('path');
const settings = require('electron-settings');

const {app, BrowserWindow, Menu, Tray} = electron;

let win;
let image;

app.on('ready', function(){
    win = new BrowserWindow({
        title: 'JiKancolle',
        width: 600,
        height: 350,
        autoHideMenuBar: true,
        resizable: false,
        icon: path.join(__dirname, 'icon', 'logo.png')
    });

    win.webContents.openDevTools();

    // win.setMenu(null);

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));



    image = path.join(__dirname, 'icon', 'logo.png');
    tray = new Tray(image);

    tray.on('click', () => {
        win.isVisible() ? win.hide() : win.show()
    });

    var contextMenu = Menu.buildFromTemplate([
        {label: 'Quit', click: function(){
            app.isQuiting = true;
            app.quit();
        }}
    ]);

    win.on('close', function(event){
        if (!app.isQuiting){
            event.preventDefault()
            win.hide()
        }
    return false
    });

    tray.setToolTip('JiKancolle');
    tray.setContextMenu(contextMenu);
});
