import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { insertUser, deleteDuplicateUsers } from '../services/db'; 
import { createAccountStyles as styles } from '../styles/CreateAccountStyles';

const CreateAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    try {
      await deleteDuplicateUsers();
      await insertUser(username, email, password);
      Alert.alert('Account Created', `Welcome, ${username}!`);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Error', 'Failed to create account or user already exists');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        testID="usernameInput"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        testID="emailInput"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="passwordInput"
      />

      <Button
        title="Create Account"
        onPress={handleCreateAccount}
        testID="createAccountButton"
      />
    </View>
  );
};

export default CreateAccountScreen;



