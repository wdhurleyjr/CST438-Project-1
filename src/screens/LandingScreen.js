import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Image } from 'react-native';
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

  const renderLeagueItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MultiTeam', { leagueId: item.id })}>
      <View style={styles.leagueTile}>
        <Image source={{ uri: item.logo }} style={styles.leagueLogo} />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to StatLine!</Text>
      <Text style={styles.subtitle}>Your go-to app for tracking soccer teams.</Text>
      
      <FlatList
        data={leagues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLeagueItem}
      />

      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default LandingScreen;




