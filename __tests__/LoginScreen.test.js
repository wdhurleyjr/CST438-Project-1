import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';  
import { Alert } from 'react-native';

const mockNavigate = jest.fn();

jest.spyOn(Alert, 'alert');

beforeEach(() => {
  mockNavigate.mockClear();
  Alert.alert.mockClear();
});

test('renders the login screen correctly', () => {
  const { getByTestId, getByPlaceholderText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);
  expect(getByTestId('loginButton')).toBeTruthy();
  expect(getByPlaceholderText('Username')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();
});

test('allows the user to input username and password', () => {
  const { getByTestId } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);
  fireEvent.changeText(getByTestId('usernameInput'), 'admin');
  expect(getByTestId('usernameInput').props.value).toBe('admin');
  fireEvent.changeText(getByTestId('passwordInput'), 'password');
  expect(getByTestId('passwordInput').props.value).toBe('password');
});

test('triggers a successful login alert when the correct credentials are entered', async () => {
  const { getByTestId } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);
  fireEvent.changeText(getByTestId('usernameInput'), 'admin');
  fireEvent.changeText(getByTestId('passwordInput'), 'password');
  await fireEvent.press(getByTestId('loginButton'));  
  expect(mockNavigate).toHaveBeenCalledWith('Landing');
  expect(Alert.alert).toHaveBeenCalledWith('Login Successful', 'Welcome, admin!');
});

test('triggers a failed login alert when the wrong credentials are entered', async () => {
  const { getByTestId } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);
  fireEvent.changeText(getByTestId('usernameInput'), 'wrong');
  fireEvent.changeText(getByTestId('passwordInput'), 'wrongpassword');
  await fireEvent.press(getByTestId('loginButton'));
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(Alert.alert).toHaveBeenCalledWith('Login Failed', 'Invalid username or password');
});
