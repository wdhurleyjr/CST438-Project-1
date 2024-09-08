import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StatusBar } from 'react-native';
import { loginStyles as styles } from '../styles/LoginStyles';

const LoginScreen = ( {navigation} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      Alert.alert('Login Successful', `Welcome, ${username}!`);
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        testID="usernameInput"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="passwordInput"
      />

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} testID="loginButton" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Teams" onPress={() => navigation.navigate('MultiTeam')} testID="TeamsButton" />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default LoginScreen;
