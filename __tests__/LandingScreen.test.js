// // __tests__/leaguesApi.test.js

// import { fetchAndStoreLeaguesIfNeeded } from '../src/services/api/leaguesApi';
// import { getSelectedLeagues, insertLeague } from '../src/services/db';

// jest.mock('../src/services/db');
// global.fetch = jest.fn();

// describe('fetchAndStoreLeaguesIfNeeded', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Clears mocks before each test
//   });

//   test('fetches leagues from API and stores them in the database if none exist', async () => {
//     // Mock the database to return an empty array
//     getSelectedLeagues.mockResolvedValue([]);

//     // Mock the fetch API response
//     fetch.mockResolvedValue({
//       json: async () => ({
//         response: [
//           {
//             league: { id: 39, name: 'Premier League', logo: 'premier-logo.png' },
//             country: { name: 'England' },
//             season: 2022,
//           },
//           {
//             league: { id: 40, name: 'Championship', logo: 'championship-logo.png' },
//             country: { name: 'England' },
//             season: 2022,
//           },
//         ],
//       }),
//     });

//     const mockSetLeagues = jest.fn();

//     // Call the function
//     await fetchAndStoreLeaguesIfNeeded(mockSetLeagues);

//     // Ensure API was called
//     expect(fetch).toHaveBeenCalledWith('https://api-football-v1.p.rapidapi.com/v3/leagues?country=England', {
//       method: 'GET',
//       headers: {},
//     });

//     // Ensure leagues were inserted into the database
//     expect(insertLeague).toHaveBeenCalledWith(39, 'Premier League', 'England', 2022, 'premier-logo.png');
//     expect(insertLeague).toHaveBeenCalledWith(40, 'Championship', 'England', 2022, 'championship-logo.png');
//   });

//   test('uses leagues from the database if they exist', async () => {
//     // Mock the database to return some leagues
//     const mockLeagues = [{ id: 39, name: 'Premier League', country: 'England', season: 2022, logo: 'premier-logo.png' }];
//     getSelectedLeagues.mockResolvedValue(mockLeagues);

//     const mockSetLeagues = jest.fn();

//     // Call the function
//     await fetchAndStoreLeaguesIfNeeded(mockSetLeagues);

//     // Ensure API was not called
//     expect(fetch).not.toHaveBeenCalled();

//     // Ensure setLeagues was called with the leagues from the database
//     expect(mockSetLeagues).toHaveBeenCalledWith(mockLeagues);
//   });

//   test('handles errors during the fetch process', async () => {
//     // Mock the database to return an empty array
//     getSelectedLeagues.mockResolvedValue([]);

//     // Mock fetch to throw an error
//     fetch.mockRejectedValue(new Error('API Error'));

//     const mockSetLeagues = jest.fn();

//     // Call the function
//     await fetchAndStoreLeaguesIfNeeded(mockSetLeagues);

//     // Ensure error was logged
//     expect(console.error).toHaveBeenCalledWith('Error fetching leagues:', expect.any(Error));
//   });
// });
