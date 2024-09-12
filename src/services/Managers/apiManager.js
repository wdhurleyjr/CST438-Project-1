import { fetchAndStoreLeaguesIfNeeded } from '../api/leaguesApi';
import { fetchAndStoreTeamsIfNeeded } from '../api/teamsApi';

export const validateAndCallApi = async (token, apiType, params, setResults) => {
  if (isValidToken(token)) {
    switch (apiType) {
      case 'leagues':
        await fetchAndStoreLeaguesIfNeeded(setResults); 
        break;
      case 'teams':
        const { leagueId } = params;
        await fetchAndStoreTeamsIfNeeded(leagueId, setResults); 
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
