import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LandingScreen from '../src/screens/LandingScreen';  

const mockNavigate = jest.fn();

beforeEach(() => {
  mockNavigate.mockClear();
});

test('renders the landing screen correctly', () => {
  const { getByText } = render(<LandingScreen navigation={{ navigate: mockNavigate }} />);
  expect(getByText('Welcome to StatLine!')).toBeTruthy();
  expect(getByText('Your go-to app for tracking soccer teams.')).toBeTruthy();
  expect(getByText('Logout')).toBeTruthy();
  expect(getByText('Teams')).toBeTruthy();
});

test('allows the user to logout and navigate back to login screen', () => {
  const { getByText } = render(<LandingScreen navigation={{ navigate: mockNavigate }} />);
  fireEvent.press(getByText('Logout'));
  expect(mockNavigate).toHaveBeenCalledWith('Login');
});

test('allows the user to view Teams page and navigate to MultiTeam screen', () => {
  const { getByText } = render(<LandingScreen navigation={{ navigate: mockNavigate }} />);
  fireEvent.press(getByText('Teams'));
  expect(mockNavigate).toHaveBeenCalledWith('MultiTeam');
});