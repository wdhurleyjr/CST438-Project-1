import React from 'react';
import { View, Text, Button} from 'react-native';
import { MultiTeamStyles as styles } from '../styles/MultiTeamStyles';

const MultiTeamScreen = ( {navigation}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teams Page</Text>

      <Text style={styles.title}>Team: FC Barcelona</Text>
      <Text style={styles.rowContainer}>Wins: 3   Losses: 1    Draws: 0</Text>
      <Text style={styles.rowContainer}>Points Per Game: 3.00</Text>

      <Button title="Home" onPress={() => navigation.navigate('Landing')} />

      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default MultiTeamScreen;
