'use strict';

const {app, BrowserWindow, Menu, globalShortcut, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
const {version} = require('./package.json');
var mainWindow = null;

function logger(msg) {
    if (process.platform !== 'win32') {
        return false;
    }
    var log_path = path.resolve(process.env.APPDATA, 'entry_log');
    if(!fs.existsSync(log_path)) {
        fs.mkdirSync(log_path);
        fs.writeFileSync(path.join(log_path, 'debug.log'), '', 'utf8');
    }
    var data = fs.readFileSync(path.join(log_path, 'debug.log'), 'utf8');
    data += '\n\r' + new Date() + ' : ' + msg;
    fs.writeFileSync(path.join(log_path, 'debug.log'), data, 'utf8');
}

// Parse command line options.
const argv = process.argv.slice(1);
var option = { file: null, help: null, version: null, webdriver: null, modules: [] };
for (var i = 0; i < argv.length; i++) {
    if (argv[i] == '--version' || argv[i] == '-v') {
        option.version = true;
        break;
    } else if (argv[i].match(/^--app=/)) {
        option.file = argv[i].split('=')[1];
        break;
    } else if (argv[i] == '--help' || argv[i] == '-h') {
        option.help = true;
        break;
    } else if (argv[i] == '--test-type=webdriver') {
        option.webdriver = true;
    } else if (argv[i] == '--debug' || argv[i] == '-d') {
        option.debug = true;
        continue;
    } else if (argv[i] == '--require' || argv[i] == '-r') {
        option.modules.push(argv[++i]);
        continue;
    } else if (argv[i][0] == '-') {
        continue;
    } else if (argv[i] == 'app') {
        continue;
    } else {
        option.file = argv[i];
        break;
    }
}

app.on('window-all-closed', () => {
    app.quit();
    process.exit(0);
});


var shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    // 어플리케이션을 중복 실행했습니다. 주 어플리케이션 인스턴스를 활성화 합니다.
    if (mainWindow) {
        if (mainWindow.isMinimized()) 
            mainWindow.restore();
        mainWindow.focus();

        if(Array.isArray(commandLine) && commandLine[1]) {
            mainWindow.webContents.send('loadProject', commandLine[1]);
        }
    }

    return true;
});

if (shouldQuit) {
    app.quit();
    return;
}

app.once('ready', () => {
    const language = app.getLocale();
    let title = version;
    
    if(language === 'ko') {
        title = '엔트리 v' + title;
    } else {
        title = 'Entry v' + title;
    }

    mainWindow = new BrowserWindow({
        width: 1024, 
        height: 700,
        title: title,
        webPreferences: {
            backgroundThrottling: false
        }
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL('file:///' + path.join(__dirname, 'main.html'));
    option.debug && mainWindow.webContents.openDevTools();
    mainWindow.webContents.startFile = option.file;

    mainWindow.on('page-title-updated', e => {
        e.preventDefault();
    });

    mainWindow.on('close', e => {
        mainWindow.webContents.send('main-close');
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
        process.exit(0);
    });

    let inspectorShortcut = '';
    if(process.platform == 'darwin') {
        inspectorShortcut = 'Command+Alt+i';
    } else {
        inspectorShortcut = 'Control+Shift+i';
    }

    globalShortcut.register(inspectorShortcut, () => {
        mainWindow.webContents.openDevTools();
    });

});