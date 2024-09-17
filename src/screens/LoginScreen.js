import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { loginStyles as styles } from '../styles/LoginStyles';
import { checkUserCredentials } from '../services/db';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      const isValidUser = await checkUserCredentials(username, password);
      if (isValidUser) {
        Alert.alert('Login Successful', `Welcome, ${username}!`);
        navigation.navigate('Landing');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Login Failed', 'There was an error during the login process');
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
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

      <TouchableOpacity onPress={handleCreateAccount} style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>
          Don’t have an account? <Text style={styles.createAccountLink}>Create one here.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;



