import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';  
import { Alert } from 'react-native';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('LoginScreen', () => {
  it('renders the login screen correctly', () => {
    const { getByTestId, getByPlaceholderText } = render(<LoginScreen />);

    expect(getByTestId('loginButton')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('allows the user to input username and password', () => {
    const { getByTestId, getByPlaceholderText } = render(<LoginScreen />);

    fireEvent.changeText(getByTestId('usernameInput'), 'admin');
    expect(getByTestId('usernameInput').props.value).toBe('admin');

    fireEvent.changeText(getByTestId('passwordInput'), 'password');
    expect(getByTestId('passwordInput').props.value).toBe('password');
  });

  it('triggers a successful login alert when the correct credentials are entered', () => {
    const { getByTestId } = render(<LoginScreen />);

    fireEvent.changeText(getByTestId('usernameInput'), 'admin');
    fireEvent.changeText(getByTestId('passwordInput'), 'password');

    fireEvent.press(getByTestId('loginButton'));

    expect(Alert.alert).toHaveBeenCalledWith('Login Successful', 'Welcome, admin!');
  });

  it('triggers a failed login alert when the wrong credentials are entered', () => {
    const { getByTestId } = render(<LoginScreen />);

    fireEvent.changeText(getByTestId('usernameInput'), 'wrong');
    fireEvent.changeText(getByTestId('passwordInput'), 'wrongpassword');

    fireEvent.press(getByTestId('loginButton'));

    expect(Alert.alert).toHaveBeenCalledWith('Login Failed', 'Invalid username or password');
  });
});


