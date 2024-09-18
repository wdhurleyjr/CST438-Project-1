import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Image } from 'react-native';
import { MultiTeamStyles as styles } from '../styles/MultiTeamStyles';
import { validateAndCallApi } from '../services/Managers/apiManager';
import { getTeamsByLeague } from '../services/db';
const MultiTeamScreen = ( {navigation, route}) => {
  const [teams, setTeams] = useState([]);
  const {leagueId} = route.params;

  const handleFetchTeams = async () => {
    await validateAndCallApi('teams', 'teams', {}, async () => {
      await getTeamsByLeague(leagueId, setTeams);
    });
  };

  useEffect(() => {
    handleFetchTeams();
  }, []);

  const renderTeamsItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MultiTeam', { leagueId: item.id })}>
      <View style={styles.lteamsTile}>
        <Image source={{ uri: item.logo }} style={styles.teamsLogo} />
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>Founded by: {item.founded}</Text>
        <Text style={styles.itemText}>{item.venue_name} Venue in {item.venue_city}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teams Page!</Text>
      
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTeamsItem}
      />

      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default MultiTeamScreen;
