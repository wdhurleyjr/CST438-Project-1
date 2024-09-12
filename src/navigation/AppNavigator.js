import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import LandingScreen from '../screens/LandingScreen';
import LeagueScreen from '../screens/LeagueScreen';
import TeamsScreen from '../screens/MutliTeamScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Landing" component={LandingScreen} options={{ title: 'Welcome', headerLeft: null }} />
      <Stack.Screen name="Leagues" component={LeagueScreen} options={{ title: 'Football Leagues' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
