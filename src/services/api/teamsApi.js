import { getTeamsByLeague, insertTeam } from '../db'; 

const apiKey = '4a7813a829mshb8952297309bb32p1d35c1jsnc815c1dc5587';
const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';

export const fetchAndStoreTeamsIfNeeded = async (leagueId, setTeams) => {
  try {
    console.log('fetchAndStoreTeamsIfNeeded received leagueId:', leagueId); // Ensure leagueId is received correctly
    
    const teamsFromDb = await getTeamsByLeague(leagueId);
    
    if (teamsFromDb.length === 0) {
      console.log('No teams found in database, calling API...');
      console.log('Making API call with leagueId:', leagueId);
      const response = await fetch(`${apiUrl}/teams?league=${leagueId}&season=2024`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      });
      const data = await response.json();
      console.log('API response:', data);

      if (data.response) {
        const teamsToInsert = data.response.map(teamsInfo => {
          const { id, name, logo, founded } = teamsInfo.team;
          const { name: venue_name, city: venue_city } = teamsInfo.venue;
          insertTeam(id, name, logo, founded, venue_name, venue_city, leagueId);
          return { id, name, logo, founded, venue_name, venue_city };
        });
        setTeams(teamsToInsert);
      } else {
        console.error('API response did not contain teams data');
      }
    } else {
      setTeams(teamsFromDb);
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};
