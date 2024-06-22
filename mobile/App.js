import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DataEntryScreen from './screens/DataEntryScreen';
import AuthScreen from './screens/AuthScreen';
import Dashboard from './screens/Dashboard';
import DesignScreen from './screens/DesignScreen';

const Stack = createStackNavigator();

const App = () => {
  try {
    console.log('Rendering App Component');
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="DataEntry" component={DataEntryScreen} />
          <Stack.Screen name="Design" component={DesignScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } catch (error) {
    console.error('Error inside App Component:', error);
    return null;
  }
};

export default App;
