
const { app, BrowserWindow, dialog } = require('electron');

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

	win.webContents.on('will-prevent-unload', (event) => {
		const choice = dialog.showMessageBoxSync(win, {
			type: 'question',
			buttons: ['Quit', 'Stay'],
			title: 'Do you want to quit?',
			message: 'Code will be lost if you quit. Are you sure?',
			defaultId: 0,
			cancelId: 1
		})
		const leave = (choice === 0)
		if (leave) {
			event.preventDefault()
		}
	})
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
