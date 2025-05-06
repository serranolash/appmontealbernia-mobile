// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home        from '../components/Home';
import Vendedores from '../components/Vendedores';
import Empleados  from '../components/Empleados';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown:false }}>
        <Stack.Screen name="Home"       component={Home} />
        <Stack.Screen name="Vendedores" component={Vendedores} />
        <Stack.Screen name="Empleados"  component={Empleados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
