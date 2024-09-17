import { fetchAndStoreLeaguesIfNeeded } from '../src/services/api/leaguesApi';
import { insertLeague, getSelectedLeagues } from '../src/services/db'; // Assuming you mock db interactions

jest.mock('../src/services/db', () => ({
  insertLeague: jest.fn(),
  getSelectedLeagues: jest.fn().mockResolvedValue([]), 
}));

describe('fetchAndStoreLeaguesIfNeeded', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch leagues and store them in the database', async () => {
    const mockResponse = {
      response: [
        {
          league: { id: 39, name: 'Premier League', logo: 'some-logo-url' },
          country: { name: 'England' },
          season: 2022,
        },
        {
          league: { id: 40, name: 'Championship', logo: 'some-logo-url' },
          country: { name: 'England' },
          season: 2022,
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });
    const setLeaguesMock = jest.fn();
    await fetchAndStoreLeaguesIfNeeded(setLeaguesMock);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api-football-v1.p.rapidapi.com/v3/leagues?country=England',
      expect.objectContaining({
        method: 'GET',
        headers: expect.any(Object),
      })
    );
    expect(insertLeague).toHaveBeenCalledWith(39, 'Premier League', 'England', 2022, 'some-logo-url');
    expect(insertLeague).toHaveBeenCalledWith(40, 'Championship', 'England', 2022, 'some-logo-url');
  });

  it('should handle API errors gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Error'));
    const setLeaguesMock = jest.fn();
    await expect(fetchAndStoreLeaguesIfNeeded(setLeaguesMock)).resolves.not.toThrow();
    expect(global.fetch).toHaveBeenCalled();
    expect(insertLeague).not.toHaveBeenCalled();
  });
});







