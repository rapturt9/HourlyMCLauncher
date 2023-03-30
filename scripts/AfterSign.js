const dotenv = require('dotenv');
const electron_notarize = require('electron-notarize');
const fs = require('fs');
const path = require('path');

dotenv.config();

console.log('afterSign hook triggered');
const appId = 'com.hourlymc.HourlyMCLauncher';
const appPath =
  '/Users/ram/Documents/GitHub/HourlyMCLauncher/deploy/HourlyMCLauncher-mac-setup.dmg';
if (!fs.existsSync(appPath)) {
  console.log('skip');
  return;
}

console.log(`Notarizing ${appId} found at ${appPath}`);

try {
  electron_notarize.notarize({
    appBundleId: appId,
    appPath,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD
  });
} catch (error) {
  console.error(error);
}

console.log(`Done notarizing ${appId}`);
