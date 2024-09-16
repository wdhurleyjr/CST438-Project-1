import { insertLeague } from '../src/services/db';
import { fetchAndStoreLeaguesIfNeeded } from '../src/services/api/leaguesApi';

jest.mock('../src/services/db', () => ({
  insertLeague: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        response: [
          {
            league: {
              id: 39,
              name: 'Premier League',
              logo: 'https://some-league-logo-url.png',
            },
            country: {
              name: 'England',
            },
          },
        ],
      }),
  })
);

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  fetch.mockClear();
  insertLeague.mockClear();
  console.error.mockRestore();
});

describe('fetchAndStoreLeaguesIfNeeded', () => {
  it('should fetch leagues and store them in the database', async () => {
    const setLeaguesMock = jest.fn();

    await fetchAndStoreLeaguesIfNeeded(setLeaguesMock);

    expect(fetch).toHaveBeenCalledWith(
      'https://api-football-v1.p.rapidapi.com/v3/leagues?country=England',
      expect.objectContaining({
        method: 'GET',
        headers: expect.any(Object),
      })
    );

    expect(insertLeague).toHaveBeenCalledWith(
      39,
      'Premier League',
      'England',
      'https://some-league-logo-url.png'
    );

    expect(setLeaguesMock).toHaveBeenCalledWith([
      {
        id: 39,
        name: 'Premier League',
        country: 'England',
        logo: 'https://some-league-logo-url.png',
      },
    ]);
  });

  it('should handle API errors gracefully', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API fetch failed'))
    );

    const setLeaguesMock = jest.fn();

    await fetchAndStoreLeaguesIfNeeded(setLeaguesMock);

    expect(setLeaguesMock).not.toHaveBeenCalled();
  });
});



