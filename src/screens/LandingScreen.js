import React from 'react';
import { View, Text, Button } from 'react-native';
import { landingStyles as styles } from '../styles/LandingStyles'; 

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to StatLine!</Text>
      <Text style={styles.subtitle}>Your go-to app for tracking soccer teams.</Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')} 
      />
    </View>
  );
};

export default LandingScreen;
