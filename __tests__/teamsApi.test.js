import { insertTeam } from '../src/services/db';
import { fetchAndStoreTeamsIfNeeded } from '../src/services/api/teamsApi';

jest.mock('../src/services/db', () => ({
  insertTeam: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        response: [
          {
            team: {
              id: 33,
              name: 'Manchester United',
              logo: 'https://some-team-logo-url.png',
              founded: 1878,
            },
            venue: {
              name: 'Old Trafford',
              city: 'Manchester',
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
  insertTeam.mockClear();
  console.error.mockRestore();
});

describe('fetchAndStoreTeamsIfNeeded', () => {
  it('should fetch teams and store them in the database', async () => {
    const leagueId = 39;
    const setTeamsMock = jest.fn();

    await fetchAndStoreTeamsIfNeeded(leagueId, setTeamsMock);

    expect(fetch).toHaveBeenCalledWith(
      `https://api-football-v1.p.rapidapi.com/v3/teams?league=${leagueId}&season=2022`,
      expect.objectContaining({
        method: 'GET',
        headers: expect.any(Object),
      })
    );

    expect(insertTeam).toHaveBeenCalledWith(
      33,
      'Manchester United',
      'https://some-team-logo-url.png',
      1878,
      'Old Trafford', 
      'Manchester',
      leagueId 
    );

    expect(setTeamsMock).toHaveBeenCalledWith([
      {
        id: 33,
        name: 'Manchester United',
        logo: 'https://some-team-logo-url.png',
        founded: 1878,
        venue_name: 'Old Trafford',
        venue_city: 'Manchester',
      },
    ]);
  });

  it('should handle API errors gracefully', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API fetch failed'))
    );

    const leagueId = 39;
    const setTeamsMock = jest.fn();

    await fetchAndStoreTeamsIfNeeded(leagueId, setTeamsMock);

    expect(setTeamsMock).not.toHaveBeenCalled();
  });
});



