import {getTeamsByLeague, insertTeam } from '../db'; 

const apiKey = '4a7813a829mshb8952297309bb32p1d35c1jsnc815c1dc5587';
const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';

export const fetchAndStoreTeamsIfNeeded = async (leagueId, setTeams) => {
  try {
    const teamsFromDb = await getTeamsByLeague(leagueId, setTeams);
    
    if (teamsFromDb.length === 0) {
      console.log('No teams found in database, calling API...');
      
      const response = await fetch(`${apiUrl}/teams?league=${leagueId}&season=2024`, {
        method: 'GET',
        headers: {
        },
      });
      const data = await response.json();
      console.log('API response:', data);

      for (const teamsInfo of data.response) {
        const { id, name, logo, founded } = teamsInfo.team;
        const { name: venue_name, city: venue_city } = teamsInfo.venue;
        await insertTeam(id, name, logo, founded, venue_name, venue_city, leagueId);
        // console.log(`Inserted team ${name} into the database`);
      }
    } else {
      setTeams(teamsFromDb);
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};