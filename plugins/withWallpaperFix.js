const { withAndroidManifest } = require('@expo/config-plugins');

const withWallpaperFix = (config) => {
    return withAndroidManifest(config, async (config) => {
        const androidManifest = config.modResults;

        // 1. Find the Main Application
        const mainApplication = androidManifest.manifest.application[0];

        // 2. Find the Main Activity
        const mainActivity = mainApplication.activity.find(
            (activity) => activity['android:name'] === '.MainActivity'
        );

        if (mainActivity) {
            const newConfigChanges = [
                'keyboard',
                'keyboardHidden',
                'orientation',
                'screenSize',
                'smallestScreenSize',
                'uiMode',
                'locale',
                'layoutDirection',
                'fontScale',
                'assetsPaths',
                'screenLayout',
                'density',
                'colorMode',
                'fontWeight'
            ];

            // 4. Force these flags into the manifest
            mainActivity['android:configChanges'] = newConfigChanges.join('|');

            // 5. Enforce singleInstance to prevent "Multiple Linking" errors
            mainActivity['android:exported'] = 'true';
        }

        return config;
    });
};

module.exports = withWallpaperFix;
