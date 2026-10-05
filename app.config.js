export default {
  expo: {
    name: 'Kebapp',
    slug: 'Kebapp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/kebapp-ios-icon.png',
    scheme: 'kebapp',
    userInterfaceStyle: 'automatic',

    ios: {
      icon: './assets/images/kebapp-ios-icon.png',
    },

    android: {
      adaptiveIcon: {
        backgroundColor: '#0B1E3A',
        foregroundImage: './assets/images/kebapp-android-foreground.png',
        monochromeImage: './assets/images/kebapp-android-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
      package: 'com.scoopsdcfc.Kebapp',
    },

    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },

    plugins: [
      'expo-router',

      [
        'expo-splash-screen',
        {
          image: './assets/images/kebapp-splash.png',
          imageWidth: 1024,
          resizeMode: 'cover',
          backgroundColor: '#0B1E3A',
        },
      ],

      [
        'react-native-maps',
        {
          androidGoogleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
