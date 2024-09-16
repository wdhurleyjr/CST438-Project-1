import { getLeagues, insertLeague } from '../db';

const apiKey = '4a7813a829mshb8952297309bb32p1d35c1jsnc815c1dc5587';
const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';

const desiredLeagues = [39, 40];

export const fetchAndStoreLeaguesIfNeeded = async (setLeagues) => {
  try {
    const response = await fetch(`${apiUrl}/leagues?country=England`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });
    
    const data = await response.json();
    
    if (data && data.response) {
      const leagues = data.response.filter(league => desiredLeagues.includes(league.league.id));
      for (const league of leagues) {
        const leagueId = league.league.id;
        const leagueName = league.league.name;
        const country = league.country.name || 'Unknown';
        const logo = league.league.logo;

        await insertLeague(leagueId, leagueName, country, logo); 
      }

      setLeagues(leagues.map(l => ({
        id: l.league.id,
        name: l.league.name,
        country: l.country.name,
        logo: l.league.logo,
      })));
      
      console.log('Selected leagues fetched and stored successfully');
    } else {
      console.log('No leagues found in API response');
    }
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
};
