import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

const AuthScreen = () => {
  console.log('Image source:', require('../public/images/gradient-back.jpeg'));
  return (
    <View style={styles.fullScreen}>
      <ImageBackground 
        source={require('../public/images/gradient-back.jpeg')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>Testing Image Background</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
  }
});

export default AuthScreen;
