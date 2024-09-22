import React from 'react';
import { render } from '@testing-library/react-native';
import PlayerScreen from '../src/screens/PlayerScreen';

const mockPlayers = [
  {
    id: 1,
    name: 'Lionel Messi',
    photo: 'https://some-player-photo-url.png',
    age: 34,
    nationality: 'Argentina',
    appearances: 30,
    goals: 25,
    assists: 5,
  },
];

test('renders PlayerScreen correctly', () => {
  const { getByText, getByTestId } = render(<PlayerScreen players={mockPlayers} />);

  expect(getByText('Lionel Messi')).toBeTruthy();
  expect(getByText('Age: 34')).toBeTruthy();
  expect(getByText('Nationality: Argentina')).toBeTruthy();
  expect(getByText('Appearances: 30')).toBeTruthy();
  expect(getByText('Goals: 25')).toBeTruthy();
  expect(getByText('Assists: 5')).toBeTruthy();
});

test('handles empty player list correctly', () => {
  const { getByText } = render(<PlayerScreen players={[]} />);

  expect(getByText('No players available')).toBeTruthy();
});