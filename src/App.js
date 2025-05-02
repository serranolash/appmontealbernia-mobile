// src/App.js
import Vendedores from '../components/Vendedores';
import Empleados  from '../components/Empleados';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Vendedores" component={Vendedores} />
        <Stack.Screen name="Empleados"  component={Empleados}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
