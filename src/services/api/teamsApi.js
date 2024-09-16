import { insertTeam } from '../db'; 

const apiKey = '4a7813a829mshb8952297309bb32p1d35c1jsnc815c1dc5587';
const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';

export const fetchAndStoreTeamsIfNeeded = async (leagueId, setTeams) => {
  try {
    const response = await fetch(`${apiUrl}/teams?league=${leagueId}&season=2022`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });
    
    const data = await response.json();

    if (data && data.response) {
      const teams = data.response.map(team => {
        const teamId = team.team.id;
        const teamName = team.team.name;
        const logo = team.team.logo;
        const founded = team.team.founded || 'Unknown';
        const venueName = team.venue?.name || 'Unknown';
        const venueCity = team.venue?.city || 'Unknown';

        insertTeam(teamId, teamName, logo, founded, venueName, venueCity, leagueId);

        return {
          id: teamId,
          name: teamName,
          logo: logo,
          founded: founded,
          venue_name: venueName,
          venue_city: venueCity,
        };
      });

      setTeams(teams);
      console.log('Teams fetched and stored successfully');
    } else {
      console.log('No teams found in API response');
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};

