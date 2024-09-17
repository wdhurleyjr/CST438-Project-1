import { getSelectedLeagues, insertLeague } from '../db';

const apiKey = '4a7813a829mshb8952297309bb32p1d35c1jsnc815c1dc5587';
const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';

const desiredLeagues = [39, 40];

export const fetchAndStoreLeaguesIfNeeded = async (setLeagues) => {
  try {
    const leaguesFromDb = await getSelectedLeagues();
    
    if (leaguesFromDb.length === 0) {
      console.log('No leagues found in database, calling API...');
      
      const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/leagues?country=England', {
        method: 'GET',
        headers: {
        },
      });
      const data = await response.json();
      console.log('API response:', data);

      for (const leagueInfo of data.response) {
        const { id, name, logo } = leagueInfo.league;
        const { name: country } = leagueInfo.country;
        const season = leagueInfo.season || 2022;
        await insertLeague(id, name, country, season, logo);
        console.log(`Inserted league ${name} into the database`);
      }
    } else {
      setLeagues(leaguesFromDb);
    }
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
};
