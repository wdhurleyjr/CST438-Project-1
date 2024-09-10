import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MultiTeamScreen from '../src/screens/MultiTeamScreen';  

const mockNavigate = jest.fn();

beforeEach(() => {
  mockNavigate.mockClear();
});

test('renders the MultiTeam screen correctly', () => {
  const { getByText } = render(<MultiTeamScreen navigation={{ navigate: mockNavigate }} />);
  expect(getByText('Teams Page')).toBeTruthy();
  expect(getByText('Team: FC Barcelona')).toBeTruthy();
  expect(getByText('Wins: 3   Losses: 1    Draws: 0')).toBeTruthy();
  expect(getByText('Points Per Game: 3.00')).toBeTruthy();
  expect(getByText('Home')).toBeTruthy();
  expect(getByText('Logout')).toBeTruthy();

});

test('allows the user to return and navigate back to landing screen', () => {
    const { getByText } = render(<MultiTeamScreen navigation={{ navigate: mockNavigate }} />);
    fireEvent.press(getByText('Home'));
    expect(mockNavigate).toHaveBeenCalledWith('Landing');
});

test('allows the user to logout and navigate back to login screen', () => {
  const { getByText } = render(<MultiTeamScreen navigation={{ navigate: mockNavigate }} />);
  fireEvent.press(getByText('Logout'));
  expect(mockNavigate).toHaveBeenCalledWith('Login');
});
