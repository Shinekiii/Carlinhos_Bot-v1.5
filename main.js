const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow() {
    // Cria uma janela de navegação.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // e carrega o arquivo index.html do seu app.
    mainWindow.loadFile('index.html');

    // Abre o DevTools (ferramentas de desenvolvedor) opcionalmente.
    // mainWindow.webContents.openDevTools();
}

// Este método será chamado quando o Electron tiver terminado
// a inicialização e estiver pronto para criar janelas de navegação.
// Algumas APIs podem ser usadas somente após este evento ocorrer.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // No macOS é comum recriar uma janela no app quando o ícone no dock é
        // clicado e não há outras janelas abertas.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Fecha o app quando todas as janelas forem fechadas, exceto no macOS. Lá, é comum
// que apps e sua barra de menu fiquem ativos até que o usuário saia explicitamente
// com Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// No arquivo principal do processo, você pode importar outros módulos
// e utilizá-los no seu app. No entanto, coloque o código de inicialização
// do Electron no arquivo acima.

