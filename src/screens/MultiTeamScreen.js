import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { validateAndCallApi } from '../services/Managers/apiManager';
import { fetchAndStoreTeamsIfNeeded } from '../services/api/teamsApi';
import { MultiTeamStyles as styles } from '../styles/MultiTeamStyles';

const MultiTeamScreen = ({ navigation, route }) => {
  const [teams, setTeams] = useState([]);
  const { leagueId } = route.params;

  const handleFetchTeams = async () => {
    await validateAndCallApi('teams', 'teams', { leagueId: leagueId }, async () => {
      console.log('Calling fetchAndStoreTeamsIfNeeded with leagueId:', leagueId);
      await fetchAndStoreTeamsIfNeeded(leagueId, setTeams);
    });
  };
  

  useEffect(() => {
    handleFetchTeams();
  }, []);

  const renderTeamsItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PlayerScreen', { teamId: item.id })}>
      <View style={styles.teamsTile}>
        <Image source={{ uri: item.logo }} style={styles.teamsLogo} />
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>Founded: {item.founded}</Text>
          <Text style={styles.itemText}>{item.venue_name} in {item.venue_city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTeamsItem}
      />
    </View>
  );
};

export default MultiTeamScreen;





