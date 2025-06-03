import React from 'react';
import Dashboard from './components/Dashboard';
import Nutrition from './components/Nutrition';
import CheckUp from './components/CheckUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Nutrition" component={Nutrition} />
        <Stack.Screen name="CheckUp" component={CheckUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
