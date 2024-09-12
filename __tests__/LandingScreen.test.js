import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LandingScreen from '../src/screens/LandingScreen';  
import { validateAndCallApi } from '../src/services/Managers/apiManager'; 

jest.mock('../src/services/Managers/apiManager'); 

const mockNavigate = jest.fn();

beforeEach(() => {
  mockNavigate.mockClear();
  validateAndCallApi.mockClear(); 
});

test('renders the landing screen correctly', () => {
  const { getByText } = render(<LandingScreen navigation={{ navigate: mockNavigate }} />);
  expect(getByText('Welcome to StatLine!')).toBeTruthy();
  expect(getByText('Your go-to app for tracking soccer teams.')).toBeTruthy();
  expect(getByText('Logout')).toBeTruthy();
});

test('allows the user to logout and navigate back to login screen', () => {
  const { getByText } = render(<LandingScreen navigation={{ navigate: mockNavigate }} />);
  fireEvent.press(getByText('Logout'));
  expect(mockNavigate).toHaveBeenCalledWith('Login');
});
