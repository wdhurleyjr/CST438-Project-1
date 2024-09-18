import { fetchAndStoreLeaguesIfNeeded } from '../api/leaguesApi';
import { fetchAndStoreTeamsIfNeeded } from '../api/teamsApi';

export const validateAndCallApi = async (token, apiType, params, setResults) => {
  if (isValidToken(token)) {
    console.log('Token is valid, calling the API for:', apiType);

    switch (apiType) {
      case 'leagues':
        await fetchAndStoreLeaguesIfNeeded(setResults);
        break;
      // Handle other API types (e.g., teams) here...
      case 'teams':
        await fetchAndStoreTeamsIfNeeded(setResults);
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

