import { getPlayersByTeam, insertPlayer } from '../db';

const apiKey = '4a7813a829mshb8952297309bb32p1d35c1jsnc815c1dc5587';
const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';

export const fetchAndStorePlayersIfNeeded = async (teamId, setPlayers) => {
  try {
    const playersFromDb = await getPlayersByTeam(teamId);

    if (playersFromDb.length === 0) {
      console.log('No players found in database, calling API...');
      const response = await fetch(`${apiUrl}/players?team=${teamId}&season=2024`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      });
      const data = await response.json();
      console.log('API response:', data);

      if (data.response) {
        const playersToInsert = data.response.map(playerInfo => {
          const { id, name, position, nationality, age } = playerInfo.player;
          insertPlayer(id, name, position, nationality, age, teamId);
          return { id, name, position, nationality, age };
        });
        setPlayers(playersToInsert);
      } else {
        console.error('API response did not contain players data');
      }
    } else {
      setPlayers(playersFromDb);
    }
  } catch (error) {
    console.error('Error fetching players:', error);
  }
};
