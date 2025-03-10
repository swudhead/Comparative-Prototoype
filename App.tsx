import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'components/screen/login';
import MapScreen from 'components/map/MapView';
import Dashboard from 'components/screen/dashboard';
import MainNav from './components/nav/MainNav';
import Eval from 'components/screen/evaluation';
import AboutProject from 'components/screen/about';
import Register from 'components/screen/register';
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
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />

        <Stack.Screen
          name="Dash"
          component={(props) => (
            <MainNav>
              <Dashboard {...props} />
            </MainNav>
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Eval"
          component={(props) => (
            <MainNav>
              <Eval {...props} />
            </MainNav>
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={(props) => (
            <MainNav>
              <AboutProject {...props} />
            </MainNav>
          )}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
