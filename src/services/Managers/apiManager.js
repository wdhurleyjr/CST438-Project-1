import { fetchAndStoreLeaguesIfNeeded } from '../api/leaguesApi';
import { fetchAndStoreTeamsIfNeeded } from '../api/teamsApi';

export const validateAndCallApi = async (token, apiType, params, setResults) => {
  if (isValidToken(token)) {
    console.log('Token is valid, calling the API for:', apiType);

    switch (apiType) {
      case 'leagues':
        await fetchAndStoreLeaguesIfNeeded(setResults);
        break;
      case 'teams':
        if (params.leagueId) {
          await fetchAndStoreTeamsIfNeeded(params.leagueId, setResults);
        } else {
          console.error('Missing leagueId for teams API');
        }
        break;
      default:
        console.log('Invalid API type');
    }
  } else {
    console.log('Invalid token');
  }
};

const isValidToken = (token) => {
  return token && token.length > 0;
};


