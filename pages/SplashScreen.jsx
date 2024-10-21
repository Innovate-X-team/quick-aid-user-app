import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Image, Animated, Easing, ImageBackground } from 'react-native';

const SplashScreen = () => {
  const scaleValue = useRef(new Animated.Value(0)).current; // Initial scale value set to 0

  // Function to handle the zoom-in animation
  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1, // Final scale value
      duration: 1000, // Animation duration in milliseconds
      easing: Easing.elastic(1), // Elastic easing for a smooth zoom-in effect
      useNativeDriver: true,
    }).start();
  }, [scaleValue]);

  return (
        <ImageBackground
            source={require('../assets/splash-background.png')}
            style={styles.container}
            imageStyle={styles.backgroundImage}
        >
      {/* Animated logo */}
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </Animated.View>

      {/* Animated title */}
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Text style={styles.title}>QUICK Aid</Text>
        <Text style={styles.subtitle}>- Made by Innovate X -</Text>
      </Animated.View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Optional: Set background color
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch', 'contain', etc.
    justifyContent: 'center',
    width: '100%',
    // left: 100,
    opacity: 0.5,
  },
  logo: {
    width: 400, // Adjust as per the image size
    height: 400,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'serif', // Optional: Change the font if needed
    marginTop: 20,
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#000',
    textAlign: 'center',
  },
});

export default SplashScreen;
