import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'components/screen/login';
import MapScreen from 'components/map/MapView';
import Dashboard from 'components/screen/dashboard';
import MainNav from './components/nav/MainNav';
import './global.css';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="MapView"
          component={(props) => (
            <MainNav>
              <MapScreen {...props} />
            </MainNav>
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dash"
          component={(props) => (
            <MainNav>
              <Dashboard {...props} />
            </MainNav>
          )}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
