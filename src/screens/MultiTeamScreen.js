import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StatusBar } from 'react-native';
import { MultiTeamStyles as styles } from '../styles/MultiTeamStyles';

const MultiTeamScreen = ( {navigation}) => {

  const handleLogout = () => {
    Alert.alert("Logout Successful");
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teams Page</Text>

      <Text style={styles.title}>Team: FC Barcelona</Text>
      <Text style={styles.rowContainer}>Wins: 3   Losses: 1    Draws: 0</Text>
      <Text style={styles.rowContainer}>Points Per Game: 3.00</Text>


      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={() => {
            
            // navigation.navigate('Login');
            Alert.alert("Logout Successful");
            }} testID="logoutButton" />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default MultiTeamScreen;
