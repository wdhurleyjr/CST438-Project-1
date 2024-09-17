import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUpScreen from '../src/screens/SignUpScreen';  
import { Alert } from 'react-native';

import { openDatabaseAsync } from 'expo-sqlite';
import {insertUser} from '../src/services/db';

const mockNavigate = jest.fn();

jest.spyOn(Alert, 'alert');
jest.mock('expo-sqlite');

beforeEach(() => {
  mockNavigate.mockClear();
  Alert.alert.mockClear();
});
test('renders the sign up screen correctly', () => {
  const { getByTestId, getByPlaceholderText } = render(<SignUpScreen navigation={{ navigate: mockNavigate }} />);
  expect(getByTestId('signUpButton')).toBeTruthy();
  expect(getByTestId('loginButton')).toBeTruthy();
  expect(getByPlaceholderText('Email')).toBeTruthy();
  expect(getByPlaceholderText('Username')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();
  expect(getByPlaceholderText('Confirm Your Password')).toBeTruthy();
});

test('allows the user to input username and password', () => {
  const { getByTestId } = render(<SignUpScreen navigation={{ navigate: mockNavigate }} />);
  fireEvent.changeText(getByTestId('emailInput'), 'test@gmail.com');
  expect(getByTestId('emailInput').props.value).toBe('test@gmail.com');
  fireEvent.changeText(getByTestId('usernameInput'), 'admin');
  expect(getByTestId('usernameInput').props.value).toBe('admin');
  fireEvent.changeText(getByTestId('passwordInput'), 'password');
  expect(getByTestId('passwordInput').props.value).toBe('password');
  fireEvent.changeText(getByTestId('confirmPasswordInput'), 'password');
  expect(getByTestId('confirmPasswordInput').props.value).toBe('password');
});


test('triggers a failed sign up alert when different passwords are entered', async () => {
  const { getByTestId } = render(<SignUpScreen navigation={{ navigate: mockNavigate }} />);
  fireEvent.changeText(getByTestId('emailInput'), 'test@gmail.com');
  fireEvent.changeText(getByTestId('usernameInput'), 'admin');
  fireEvent.changeText(getByTestId('passwordInput'), 'wrongpassword');
  fireEvent.changeText(getByTestId('confirmPasswordInput'), 'password');
  await fireEvent.press(getByTestId('signUpButton'));
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(Alert.alert).toHaveBeenCalledWith('Sign Up Failed', 'Passwords must match');
});

test('triggers a failed sign up alert when no credentials are entered', async () => {
    const { getByTestId } = render(<SignUpScreen navigation={{ navigate: mockNavigate }} />);
    fireEvent.changeText(getByTestId('emailInput'), '');
    fireEvent.changeText(getByTestId('usernameInput'), '');
    fireEvent.changeText(getByTestId('passwordInput'), '');
    fireEvent.changeText(getByTestId('confirmPasswordInput'), '');
    await fireEvent.press(getByTestId('signUpButton'));
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('Sign Up Failed', 'Please fill out all the fields');
});

test('allows the user to return to the login screen', async () => {
    const { getByTestId } = render(<SignUpScreen navigation={{ navigate: mockNavigate }} />);
    await fireEvent.press(getByTestId('loginButton'));
    expect(mockNavigate).toHaveBeenCalledWith('Login');
    expect(Alert.alert).toHaveBeenCalledWith('Returning to Login');
});

///Fail due to DB interaction 
test('triggers a successful sign up alert when the correct credentials are entered', async () => {
    const { getByTestId } = render(<SignUpScreen navigation={{ navigate: mockNavigate }} />);
    fireEvent.changeText(getByTestId('emailInput'), 'test@gmail.com');
    fireEvent.changeText(getByTestId('usernameInput'), 'admin');
    fireEvent.changeText(getByTestId('passwordInput'), 'password');
    fireEvent.changeText(getByTestId('confirmPasswordInput'), 'password');
    await fireEvent.press(getByTestId('signUpButton'));  
    expect(mockNavigate).toHaveBeenCalledWith('Login');
    expect(Alert.alert).toHaveBeenCalledWith('Sign Up Successful', 'Account created: admin!');
});
  
test('triggers a failed sign up alert when db fails to make an account', async () => {
    const { getByTestId } = render(<SignUpScreen navigation={{ navigate: mockNavigate }} />);
    fireEvent.changeText(getByTestId('emailInput'), 'test@gmail.com');
    fireEvent.changeText(getByTestId('usernameInput'), 'admin1');
    fireEvent.changeText(getByTestId('passwordInput'), 'password1');
    fireEvent.changeText(getByTestId('confirmPasswordInput'), 'password1');
    await fireEvent.press(getByTestId('signUpButton'));  
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('Sign Up Failed', 'An error occured while creating the account');
});