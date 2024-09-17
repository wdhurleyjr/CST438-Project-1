import { validateAndCallApi, isValidToken } from '../src/services/Managers/apiManager';
import { fetchAndStoreLeaguesIfNeeded } from '../src/services/api/leaguesApi';
import { fetchAndStoreTeamsIfNeeded } from '../src/services/api/teamsApi';

jest.mock('../src/services/api/leaguesApi', () => ({
  fetchAndStoreLeaguesIfNeeded: jest.fn(),
}));

jest.mock('../src/services/api/teamsApi', () => ({
  fetchAndStoreTeamsIfNeeded: jest.fn(),
}));

jest.mock('../src/services/Managers/apiManager', () => ({
  ...jest.requireActual('../src/services/Managers/apiManager'), 
  isValidToken: jest.fn(),
}));

describe('validateAndCallApi', () => {
  afterEach(() => {
    fetchAndStoreLeaguesIfNeeded.mockClear();
    fetchAndStoreTeamsIfNeeded.mockClear();
    isValidToken.mockClear();
  });

  it('should call fetchAndStoreLeaguesIfNeeded when API type is leagues and token is valid', async () => {
    isValidToken.mockReturnValueOnce(true);
    const setResultsMock = jest.fn();
    await validateAndCallApi('valid-token', 'leagues', {}, setResultsMock);
    expect(fetchAndStoreLeaguesIfNeeded).toHaveBeenCalledWith(setResultsMock);
    expect(fetchAndStoreTeamsIfNeeded).not.toHaveBeenCalled();
  });

  // it('should call fetchAndStoreTeamsIfNeeded when API type is teams and token is valid', async () => {
  //   isValidToken.mockReturnValueOnce(true);
  //   const setResultsMock = jest.fn();
  //   const params = { leagueId: 39 };
  //   await validateAndCallApi('valid-token', 'teams', params, setResultsMock);
  //   expect(fetchAndStoreTeamsIfNeeded).toHaveBeenCalledWith(39, setResultsMock);
  //   expect(fetchAndStoreLeaguesIfNeeded).not.toHaveBeenCalled();
  // });

  it('should not call any API if the token is invalid', async () => {
    isValidToken.mockReturnValueOnce(false);
    const setResultsMock = jest.fn();
    await validateAndCallApi('', 'leagues', {}, setResultsMock);
    expect(fetchAndStoreLeaguesIfNeeded).not.toHaveBeenCalled();
    expect(fetchAndStoreTeamsIfNeeded).not.toHaveBeenCalled();
    expect(setResultsMock).not.toHaveBeenCalled();
  });

  it('should log "Invalid API type" when an unknown API type is passed', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    isValidToken.mockReturnValueOnce(true);
    const setResultsMock = jest.fn();
    await validateAndCallApi('valid-token', 'unknown', {}, setResultsMock);
    expect(consoleSpy).toHaveBeenCalledWith('Invalid API type');
    expect(fetchAndStoreLeaguesIfNeeded).not.toHaveBeenCalled();
    expect(fetchAndStoreTeamsIfNeeded).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should log "Invalid token" when the token is invalid', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    isValidToken.mockReturnValueOnce(false);
    const setResultsMock = jest.fn();
    await validateAndCallApi('', 'leagues', {}, setResultsMock);
    expect(consoleSpy).toHaveBeenCalledWith('Invalid token');
    expect(fetchAndStoreLeaguesIfNeeded).not.toHaveBeenCalled();
    expect(fetchAndStoreTeamsIfNeeded).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

