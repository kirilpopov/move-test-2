// Modules to control application life and create native browser window
const { app, BaseWindow, WebContentsView, View } = require('electron')
const path = require('node:path')

function createWindow() {
  const WINDOW_WIDTH = 1500;
  const pages = [
    'https://github.com/electron/electron/blob/29fd2d343b3deef676d6df527e7a4c2144379c5c/spec/api-web-contents-view-spec.ts',
    'https://www.electronjs.org/docs/latest/api/structures/web-preferences',
    'https://edition.cnn.com/'
  ];
  const PAGE_WIDTH = WINDOW_WIDTH / pages.length;

  // Create the browser window.
  const mainView = new BaseWindow({
    width: WINDOW_WIDTH,
    height: 1200,
    frame: false
  });

  const v = new View();
  mainView.setContentView(v);

  // load titlebar
  const tb = new WebContentsView({webPreferences: {nodeIntegration: true, contextIsolation: false}});
  v.addChildView(tb);
  tb.webContents.loadFile('titlebar.html');
  tb.setBounds({ x: 0, y: 0, width: WINDOW_WIDTH, height: 30 });

  for (let i = 0; i < pages.length; i++) {
    const wv = new WebContentsView();
    // add it to main Window
    v.addChildView(wv);
    wv.webContents.loadURL(pages[i]);
    wv.setBounds({ x: PAGE_WIDTH * i, y: 30, width: PAGE_WIDTH, height: 770 });
  }

  // load footer
  const wv = new WebContentsView();
  v.addChildView(wv);
  wv.webContents.loadURL('https://learn.microsoft.com/en-us/visualstudio/ide/quickstart-ide-orientation?view=vs-2022');
  wv.setBounds({ x: 0, y: 30 + 400, width: WINDOW_WIDTH, height: 400 });

  // show the mainWindow
  mainView.show();
}

// comment this out to enable hardware acceleration
app.disableHardwareAcceleration();

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});
