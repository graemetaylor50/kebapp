import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const DURATION = 600;

const splashKeyframe = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  70: {
    opacity: 0,
    transform: [{ scale: 1.02 }],
    easing: Easing.out(Easing.ease),
  },
  100: {
    opacity: 0,
    transform: [{ scale: 1.02 }],
  },
});

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  if (!visible) return null;

  const image = (
    <Image
      style={styles.splashImage}
      source={require('@/assets/images/kebapp-splash.png')}
      contentFit='cover'
    />
  );

  if (!animate) {
    return (
      <View
        onLayout={() => {
          SplashScreen.hideAsync().finally(() => {
            setAnimate(true);
          });
        }}
        style={styles.splashOverlay}
      >
        {image}
      </View>
    );
  }

  return (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';

        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}
    >
      {image}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#0B1E3A',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },

  splashImage: {
    width: '100%',
    height: '100%',
  },
});
