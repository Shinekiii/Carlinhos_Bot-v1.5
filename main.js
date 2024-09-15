const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Carlinhos_Bot',
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'icon.ico'),  
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  exec('node index.js', { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao iniciar index.js: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  exec('node music-player/server.js', { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao iniciar server.js: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
