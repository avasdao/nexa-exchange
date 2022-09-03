import {
    app,
    dialog,
    Menu,
    shell,
    BrowserWindow,
    MenuItemConstructorOptions,
} from 'electron'

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
    selector?: string
    submenu?: DarwinMenuItemConstructorOptions[] | Menu
}

export default class MenuBuilder {
    mainWindow: BrowserWindow

    constructor(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow
    }

    buildMenu(): Menu {
        if (
            process.env.NODE_ENV === 'development' ||
            process.env.DEBUG_PROD === 'true'
        ) {
            this.setupDevelopmentEnvironment()
        }

        const template =
            process.platform === 'darwin'
            ? this.buildDarwinTemplate()
            : this.buildDefaultTemplate()

        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)

        return menu
    }

    setupDevelopmentEnvironment(): void {
        this.mainWindow.webContents.on('context-menu', (_, props) => {
            const { x, y } = props

            Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click: () => {
                        this.mainWindow.webContents.inspectElement(x, y)
                    },
                },
            ]).popup({ window: this.mainWindow })
        })
    }

    buildDarwinTemplate(): MenuItemConstructorOptions[] {
        const subMenuAbout: DarwinMenuItemConstructorOptions = {
            label: 'Electron',
            submenu: [
                {
                    label: 'About ElectronReact',
                    selector: 'orderFrontStandardAboutPanel:',
                },
                { type: 'separator' },
                { label: 'Services', submenu: [] },
                { type: 'separator' },
                {
                    label: 'Hide ElectronReact',
                    accelerator: 'Command+H',
                    selector: 'hide:',
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    selector: 'hideOtherApplications:',
                },
                { label: 'Show All', selector: 'unhideAllApplications:' },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit()
                    },
                },
            ],
        }

        const subMenuEdit: DarwinMenuItemConstructorOptions = {
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
                { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
                { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
                { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
                {
                    label: 'Select All',
                    accelerator: 'Command+A',
                    selector: 'selectAll:',
                },
            ],
        }

        const subMenuViewDev: MenuItemConstructorOptions = {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'Command+R',
                    click: () => {
                        this.mainWindow.webContents.reload()
                    },
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click: () => {
                        this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
                    },
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click: () => {
                        this.mainWindow.webContents.toggleDevTools()
                    },
                },
            ],
        }

        const subMenuViewProd: MenuItemConstructorOptions = {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click: () => {
                        this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
                    },
                },
            ],
        }

        const subMenuWindow: DarwinMenuItemConstructorOptions = {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    selector: 'performMiniaturize:',
                },
                { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
                { type: 'separator' },
                { label: 'Bring All to Front', selector: 'arrangeInFront:' },
            ],
        }

        const subMenuHelp: MenuItemConstructorOptions = {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click() {
                        shell.openExternal('https://electronjs.org')
                    },
                },
                {
                    label: 'Documentation',
                    click() {
                        shell.openExternal(
                            'https://github.com/electron/electron/tree/main/docs#readme'
                        )
                    },
                },
                {
                    label: 'Community Discussions',
                    click() {
                        shell.openExternal('https://www.electronjs.org/community')
                    },
                },
                {
                    label: 'Search Issues',
                    click() {
                        shell.openExternal('https://github.com/electron/electron/issues')
                    },
                },
            ],
        }

        const subMenuView =
            process.env.NODE_ENV === 'development' ||
            process.env.DEBUG_PROD === 'true'
            ? subMenuViewDev
            : subMenuViewProd

            return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp]
    }

    buildDefaultTemplate() {
        const templateDefault = [
            {
                label: '&File',
                submenu: [
                    {
                        label: '&Open',
                        accelerator: 'Ctrl+O',
                    },
                    {
                        label: '&Settings',
                        click: () => {
                            // this.mainWindow.close()
                        },
                    },
                    { type: 'separator' },
                    {
                        label: '&Quit',
                        accelerator: 'Ctrl+Q',
                        click: () => {
                            this.mainWindow.close()
                        },
                    },
                ],
            },
            {
                label: '&View',
                submenu:
                process.env.NODE_ENV === 'development' ||
                process.env.DEBUG_PROD === 'true'
                ? [
                    {
                        label: '&Reload',
                        accelerator: 'Ctrl+R',
                        click: () => {
                            this.mainWindow.webContents.reload()
                        },
                    },
                    {
                        label: 'Toggle &Full Screen',
                        accelerator: 'F11',
                        click: () => {
                            this.mainWindow.setFullScreen(
                                !this.mainWindow.isFullScreen()
                            )
                        },
                    },
                    {
                        label: 'Toggle &Developer Tools',
                        accelerator: 'Alt+Ctrl+I',
                        click: () => {
                            this.mainWindow.webContents.toggleDevTools()
                        },
                    },
                ]
                : [
                    {
                        label: 'Toggle &Full Screen',
                        accelerator: 'F11',
                        click: () => {
                            this.mainWindow.setFullScreen(
                                !this.mainWindow.isFullScreen()
                            )
                        },
                    },
                ],
            },
            {
                label: '&Tools',
                submenu: [
                    {
                        label: '&Lockdown',
                        accelerator: 'Ctrl+L',
                        click: () => {
                            dialog.showMessageBox({
                                type: 'info',
                                title: 'Lockdown',
                                message: 'Locking down Validator..',
                            })
                        },
                    },
                    { type: 'separator' },
                    {
                        label: '&Node Manager',
                        accelerator: 'Ctrl+N',
                    },
                    {
                        label: `Ava's DAO`,
                        click() {
                            shell.openExternal('https://avasdao.org')
                        },
                    },
                ],
            },
            {
                label: '&Gov',
                submenu: [
                    {
                        label: '&Create Proposal',
                        accelerator: 'Ctrl+C',
                        click: () => {
                            dialog.showMessageBox({
                                type: 'info',
                                title: 'Governance',
                                message: 'Would you like to create a new proposal?',
                            })
                        },
                    },
                    { type: 'separator' },
                    {
                        label: 'Voting Stats',
                    },
                    {
                        label: 'Proposal Stats',
                    },
                    {
                        label: `Ava's DAO`,
                        click() {
                            shell.openExternal('https://avasdao.org')
                        },
                    },
                ],
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Learn More',
                        click() {
                            shell.openExternal('https://electronjs.org')
                        },
                    },
                    {
                        label: 'Documentation',
                        click() {
                            shell.openExternal(
                                'https://github.com/electron/electron/tree/main/docs#readme'
                            )
                        },
                    },
                    {
                        label: 'Community Discussions',
                        click() {
                            shell.openExternal('https://www.electronjs.org/community')
                        },
                    },
                    {
                        label: 'Search Issues',
                        click() {
                            shell.openExternal('https://github.com/electron/electron/issues')
                        },
                    },
                    { type: 'separator' },
                    {
                        label: 'Submit Logs',
                        click() {
                            dialog.showMessageBox({
                                type: 'info',
                                title: 'Help & Support',
                                message: 'Would you like to send your logs to the Nexa Exchange support team?',
                            })
                        },
                    },
                ],
            },
        ]

        return templateDefault
    }
}
