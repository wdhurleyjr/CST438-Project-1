import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { landingStyles as styles } from '../styles/LandingStyles';
import { validateAndCallApi } from '../services/Managers/apiManager';
import { getSelectedLeagues } from '../services/db';

const LandingScreen = ({ navigation }) => {
  const [leagues, setLeagues] = useState([]);

  const handleFetchLeagues = async () => {
    await validateAndCallApi('leagues', 'leagues', {}, async () => {
      await getSelectedLeagues(setLeagues);
    });
  };

  useEffect(() => {
    handleFetchLeagues();
  }, []);

  const renderLeagueItem = ({ item }) => {
    console.log(`Navigating to MultiTeamScreen with leagueId: ${item.id}`);
    
    return (
      <TouchableOpacity onPress={() => navigation.navigate('MultiTeamScreen', { leagueId: item.id })}>
        <View style={styles.leagueTile}>
          <Image source={{ uri: item.logo }} style={styles.leagueLogo} />
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={leagues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLeagueItem}
      />
      <TouchableOpacity
        style={styles.logoutButton} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;






