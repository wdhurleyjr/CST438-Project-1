import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { validateAndCallApi } from '../services/Managers/apiManager';
import { fetchPlayerInfo } from '../services/api/playersApi';
import { PlayerInfoStyles as styles } from '../styles/PlayerInfoStyles';

const PlayerInfoScreen = ({ navigation, route }) => {
  const [playerInfo, setPlayerInfo] = useState([]);
  const { playerId } = route.params;

  const handleFetchPlayerInfo = async () => {
    await validateAndCallApi('playerInfo', 'playerInfo', { playerId: playerId }, async () => {
      console.log('Calling fetchPlayerInfo with playerId:', playerId);
      await fetchPlayerInfo(playerId, setPlayerInfo);
    });
  };
  

  useEffect(() => {
    handleFetchPlayerInfo();
  }, []);

  const renderPlayerInfo = ({ item }) => (
    <View>   
        <View style={styles.textContainer}>
          <Text style={styles.title}> {item.firstname} {item.lastname} </Text>
        </View>
        
      <View style={styles.row}>
        <Image source={{ uri: item.photo }} style={styles.photo} />
        <View style={styles.teamsTile}>
            <View style={styles.textContainer}>
            <Text style={styles.subtitle}> Info </Text>
            <Text style={styles.itemText}>Nationality:   {item.nationality} </Text>
            <Text style={styles.itemText}>Height:   {item.height} </Text>
            <Text style={styles.itemText}>Weight:   {item.weight} </Text>
            <Text style={styles.itemText}>Age:   {item.age} </Text>
            </View>
        </View>
      </View>

      <View style={styles.teamsTile}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}> Stats </Text>
          <Text style={styles.itemText}>Games Played:   {item.games_played}</Text>
          <Text style={styles.itemText}>Minutes Played:   {item.minutes_played}</Text>
          <Text style={styles.itemText}>Goals:   {item.goals_scored}</Text>
          <Text style={styles.itemText}>Assists:   {item.assists}</Text>
          <Text style={styles.itemText}>Fouls:   {item.fouls}</Text>
          <Text style={styles.itemText}>Yellow Cards:   {item.yellow_cards}</Text>
          <Text style={styles.itemText}>Red Cards:   {item.red_cards}</Text>
        </View>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>

      <FlatList
        data={playerInfo}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlayerInfo}
      />
    </View>
  );
};

export default PlayerInfoScreen;
