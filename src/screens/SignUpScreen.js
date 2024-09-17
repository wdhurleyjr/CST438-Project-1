import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signUpStyles as styles } from '../styles/SignUpStyles';
import { insertUser } from '../services/db';  
import * as SQLite from 'expo-sqlite';

const openDatabase = () => {
  return  SQLite.openDatabaseAsync('statline.db');
};

const SignUpScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSignUp = async () => {
    // const db= openDatabase();

    if(username === '' || password === '' || email===''){
        Alert.alert('Sign Up Failed', 'Please fill out all the fields');
        return;
    }else if(password !==confirmPassword){
        Alert.alert('Sign Up Failed', 'Passwords must match');
        return;
    }

    try {
        await insertUser(username, email, password);
        Alert.alert('Sign Up Successful', `Account created: ${username}!`);
        navigation.navigate('Login'); 
    } catch (error) {
        Alert.alert('Sign Up Failed', 'An error occured while creating the account');
        console.error('Signup Error: ', error);
    }
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.title}>Create your account!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        testID="emailInput"
      />

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Your Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        testID="confirmPasswordInput"
      />

      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} testID="signUpButton" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Already have an account? Login" 
        onPress={() =>{ 
            Alert.alert('Returning to Login');
            navigation.navigate('Login');}
        } 
        testID="loginButton" />
      </View>

    </View>
  );
};

export default SignUpScreen;

