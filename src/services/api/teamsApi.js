import { getTeamsByLeague, insertTeam } from '../db';

const apiKey = '4a7813a829mshb8952297309bb32p1d35c1jsnc815c1dc5587';
const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';

export const fetchAndStoreTeamsIfNeeded = async (leagueId, setTeams) => {
  getTeamsByLeague(leagueId, (teams) => {
    if (teams.length > 0) {
      setTeams(teams);
    } else {
      fetch(`${apiUrl}/teams?league=${leagueId}&season=2023`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      })
        .then(response => response.json())
        .then(data => {
          const teams = data.response;
          teams.forEach(team => {
            insertTeam(
              team.team.id,
              team.team.name,
              team.team.logo,
              team.team.founded,
              team.venue.name,
              team.venue.city,
              leagueId
            );
          });
          setTeams(teams);
          console.log('Teams fetched and stored successfully');
        })
        .catch(error => {
          console.log('Error fetching teams from API:', error);
        });
    }
  });
};
