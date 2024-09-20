import { getPlayerInfoByPlayerId, insertPlayer } from '../db'; 

const apiKey = '4a7813a829mshb8952297309bb32p1d35c1jsnc815c1dc5587';
const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';

export const fetchPlayerInfo = async (playerId, setPlayerInfo) => {
  try {
    console.log('fetchPlayerInfo received playerId:', playerId); // Ensure playerId is received correctly
    
    const playerInfoFromDb = await getPlayerInfoByPlayerId(playerId);
    
    if (playerInfoFromDb.length === 0) {
      console.log('No player found in database, calling API...');
      console.log('Making API call with playerId:', playerId);
      const response = await fetch(`${apiUrl}/teams?players=${playerId}&season=2024`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      });
      const data = await response.json();
      console.log('API response:', data);

      if (data.response) {
        //should already exist in repo TODO:
        const playerInfoToInsert = data.response.map(playersInfo => {
        //   const { id, name, logo, founded } = playersInfo.player;
        //   const { name: venue_name, city: venue_city } = playersInfo.statistics;
        //   insertPlayer(id, name, logo, founded, venue_name, venue_city, leagueId);
        //   return { id, name, logo, founded, venue_name, venue_city };
        });
        setPlayerInfo(playerInfoToInsert);
      } else {
        console.error('API response did not contain teams data');
      }
    } else {
        setPlayerInfo(playerInfoFromDb);
    }
  } catch (error) {
    console.error('Error fetching player info:', error);
  }
};
