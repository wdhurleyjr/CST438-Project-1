import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { fetchAndStorePlayersIfNeeded } from '../services/api/playersApi';
import { PlayerStyles as styles } from '../styles/PlayerStyles';

const PlayerScreen = ({ route }) => {
  const [players, setPlayers] = useState([]);
  const { teamId } = route.params;

  const handleFetchPlayers = async () => {
    console.log('Calling fetchAndStorePlayersIfNeeded with teamId:', teamId);
    await fetchAndStorePlayersIfNeeded(teamId, setPlayers);
  };

  useEffect(() => {
    handleFetchPlayers();
  }, []);

  const renderPlayerItem = ({ item }) => (
    <View style={styles.playerTile}>
      <Image source={{ uri: item.photo }} style={styles.playerPhoto} />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>Age: {item.age}</Text>
        <Text style={styles.itemText}>Nationality: {item.nationality}</Text>
        <Text style={styles.itemText}>Position: {item.position}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlayerItem}
      />
    </View>
  );
};

export default PlayerScreen;
