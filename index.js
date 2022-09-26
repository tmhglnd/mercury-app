
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 900,
		height: 700,
		frame: false,
		// titleBarStyle: 'hiddenInset',
		titleBarStyle: 'hidden',
		icon: __dirname + '/public/assets/icon/mercury-logo.png'
	});

	win.loadFile('public/index.html');
	// win.setMenuBarVisibility(false);
}

app.setName('Mercury Playground');

app.whenReady().then(() => {
	createWindow();

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
