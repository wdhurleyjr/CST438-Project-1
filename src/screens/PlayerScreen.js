import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { fetchPlayersByTeamId } from '../services/api/playersApi';
import { PlayerStyles as styles } from '../styles/PlayerStyles';

const PlayerScreen = ({ route }) => {
  const { teamId } = route.params; // Expect teamId to be passed from MultiTeamScreen.js
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const fetchedPlayers = await fetchPlayersByTeamId(teamId);
        setPlayers(fetchedPlayers);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [teamId]);

  const renderPlayerItem = ({ item }) => (
    <View style={styles.playerTile}>
      <Image source={{ uri: item.photo }} style={styles.playerPhoto} />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>Name: {item.name}</Text>
        <Text style={styles.itemText}>Position: {item.position}</Text>
        <Text style={styles.itemText}>Age: {item.age}</Text>
        <Text style={styles.itemText}>Nationality: {item.nationality}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team Players</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlayerItem}
      />
    </View>
  );
};

export default PlayerScreen;
