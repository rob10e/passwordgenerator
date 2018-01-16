const path = require('path');

const iconFile = path.resolve(__dirname, './resources/icon_multi.ico');

module.exports = {
  make_targets: {
    win32: ['squirrel', 'zip'],
    darwin: ['zip'],
    linux: ['deb'],
  },
  electronPackagerConfig: {
    packageManager: 'yarn',
    icon: iconFile,
    name: 'AllPasswordGenerator',
  },
  electronWinstallerConfig: {
    description: 'All Password Generator',
    setupIcon: iconFile,
    iconUrl: iconFile,
    loadingGif: path.resolve(__dirname, './resources/splash.gif'),
  },
  electronInstallerDebian: {
    icon: path.resolve(__dirname, './resources/Icon.png'),
    categories: ['Utility'],
    homepage: 'http://www.tenneysoftware.com',
  },
  electronInstallerRedhat: {},
  github_repository: {
    owner: 'rob10e',
    name: 'passwordgenerator',
  },
  windowsStoreConfig: {
    packageName: '',
    name: 'passwordgenerator',
  },
  publish_targets: {
    win32: ['github'],
    darwin: ['github'],
    linux: ['github'],
  },
};
