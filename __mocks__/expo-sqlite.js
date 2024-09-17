import * as SQLite from 'expo-sqlite';

jest.mock('expo-sqlite');

const dbMock = {
  execAsync: jest.fn(() => Promise.resolve()), // Simulate table creation
  runAsync: jest.fn(() => Promise.resolve({ insertId: 1 })), // For INSERT, UPDATE, DELETE queries
  getFirstAsync: jest.fn(() => Promise.resolve(null)), // Simulate fetching first row
  getAllAsync: jest.fn((query) => {
    if (query.includes('SELECT * FROM users')) {
      return Promise.resolve({ rows: { _array: [] } }); // Mock empty users array
    } else if (query.includes('SELECT * FROM leagues')) {
      return Promise.resolve({
        rows: {
          _array: [{ id: 39, name: 'Premier League', country: 'England', season: 2022, logo: 'some-logo-url' }],
        },
      });
    } else if (query.includes('SELECT * FROM teams WHERE league_id = ?')) {
      return Promise.resolve({
        rows: {
          _array: [{ id: 33, name: 'Manchester United', logo: 'some-team-logo-url', founded: 1878, venue_name: 'Old Trafford', venue_city: 'Manchester', league_id: 39 }],
        },
      });
    }
    return Promise.resolve({ rows: { _array: [] } }); // Default case
  }),
};

// Mock the openDatabase function to return the mock db instance
SQLite.openDatabase.mockReturnValue(dbMock);

