import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import LandingScreen from '../screens/LandingScreen';
import LeagueScreen from '../screens/LeagueScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MultiTeamScreen from '../screens/MultiTeamScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Landing" component={LandingScreen} options={{ title: 'Welcome', headerLeft: null }} />
      <Stack.Screen name="Leagues" component={LeagueScreen} options={{ title: 'Football Leagues' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="MultiTeam" component={MultiTeamScreen} options={{ title: 'Teams' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
