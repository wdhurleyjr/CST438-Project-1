import { insertPlayer } from '../src/services/db';
import { fetchAndStorePlayersIfNeeded } from '../src/services/api/playersApi';

jest.mock('../src/services/db', () => ({
  insertPlayer: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        response: [
          {
            player: {
              id: 123,
              name: 'Lionel Messi',
              photo: 'https://some-player-photo-url.png',
              age: 34,
              nationality: 'Argentina',
            },
            statistics: [
              {
                games: { appearances: 30 },
                goals: { total: 25 },
                assists: 5,
              }
            ],
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
  insertPlayer.mockClear();
  console.error.mockRestore();
});

describe('fetchAndStorePlayersIfNeeded', () => {
  it('should fetch players and store them in the database', async () => {
    const teamId = 33;
    const setPlayersMock = jest.fn();

    await fetchAndStorePlayersIfNeeded(teamId, setPlayersMock);

    expect(fetch).toHaveBeenCalledWith(
      `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamId}&season=2024`,
      expect.objectContaining({
        method: 'GET',
        headers: expect.any(Object),
      })
    );

    expect(insertPlayer).toHaveBeenCalledWith(
      123,
      'Lionel Messi',
      'https://some-player-photo-url.png',
      34,
      'Argentina',
      30,
      25,
      5,
      teamId
    );

    expect(setPlayersMock).toHaveBeenCalledWith([
      {
        id: 123,
        name: 'Lionel Messi',
        photo: 'https://some-player-photo-url.png',
        age: 34,
        nationality: 'Argentina',
        appearances: 30,
        goals: 25,
        assists: 5,
      },
    ]);
  });

  it('should handle API errors gracefully', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API fetch failed'))
    );
    const teamId = 33;
    const setPlayersMock = jest.fn();
    await fetchAndStorePlayersIfNeeded(teamId, setPlayersMock);
    expect(setPlayersMock).not.toHaveBeenCalled();
  });
});
