import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton'; // Adjusted import path

const TestScreen = () => {
  const handlePress = () => {
    alert('Custom button pressed!');
  };

  return (
    <View style={styles.container}>
      <CustomButton onPress={handlePress} title="Press Me" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestScreen;