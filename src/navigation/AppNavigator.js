import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import LandingScreen from '../screens/LandingScreen';
import LeagueScreen from '../screens/LeagueScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import MultiTeamScreen from '../screens/MultiTeamScreen'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Login' }} 
      />
      <Stack.Screen 
        name="Landing" 
        component={LandingScreen} 
        options={{ title: 'Welcome to StatLine!', headerLeft: null }} 
      />
      <Stack.Screen 
        name="Leagues" 
        component={LeagueScreen} 
        options={{ title: 'Football Leagues' }} 
      />
      <Stack.Screen 
        name="CreateAccount" 
        component={CreateAccountScreen} 
        options={{ title: 'Create Account' }} 
      />
      <Stack.Screen
        name="MultiTeamScreen"
        component={MultiTeamScreen}
        options={{ title: 'Teams'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

