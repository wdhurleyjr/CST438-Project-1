import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { leagueStyles as styles } from '../styles/LeagueStyles';

// This is a placeholder list of leagues, which will eventually come from the API
const leagues = [
  { id: '1', name: 'Premier League' },
  { id: '2', name: 'La Liga' },
  { id: '3', name: 'Serie A' },
  { id: '4', name: 'Bundesliga' },
  { id: '5', name: 'Ligue 1' }
];

const LeagueScreen = ({ navigation }) => {

  // This function renders each league as a button
  const renderLeague = ({ item }) => (
    <TouchableOpacity
      style={styles.leagueButton}
      onPress={() => navigation.navigate('MultiTeam', { leagueId: item.id })}
    >
      <Text style={styles.leagueText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Football League</Text>

      {/* FlatList to display the league options */}
      <FlatList
        data={leagues}
        renderItem={renderLeague}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default LeagueScreen;
