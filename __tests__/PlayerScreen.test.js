import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LeagueScreen from '../src/screens/PlayerScreen';

const mockNavigate = jest.fn();

beforeEach(() => {
  mockNavigate.mockClear();
});

test('renders the League screen correctly', () => {
  const { getByText } = render(<LeagueScreen navigation={{ navigate: mockNavigate }} />);

  // Check if the title and league names are displayed
  expect(getByText('Select a Football League')).toBeTruthy();
  expect(getByText('Premier League')).toBeTruthy();
  expect(getByText('La Liga')).toBeTruthy();
  expect(getByText('Serie A')).toBeTruthy();
  expect(getByText('Bundesliga')).toBeTruthy();
  expect(getByText('Ligue 1')).toBeTruthy();
});

test('navigates to MultiTeam screen with the correct league ID when a league is selected', () => {
  const { getByText } = render(<LeagueScreen navigation={{ navigate: mockNavigate }} />);

  // Simulate pressing on a league (e.g., Premier League)
  fireEvent.press(getByText('Premier League'));

  // Ensure navigation to MultiTeam screen happens with the correct league ID
  expect(mockNavigate).toHaveBeenCalledWith('MultiTeam', { leagueId: '1' });

  // Simulate pressing on another league (e.g., La Liga)
  fireEvent.press(getByText('La Liga'));
  expect(mockNavigate).toHaveBeenCalledWith('MultiTeam', { leagueId: '2' });
});
