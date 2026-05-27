import React from 'react';
// Importes de navegación
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importes de Pantallas
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import InventarioScreen from './src/screens/InventarioScreen';
import ProductoScreen from './src/screens/ProductoScreen';
import IngresoProductoScreen from './src/screens/IngresoProductoScreen';
import SalidaProductoScreen from './src/screens/SalidaProductoScreen';

// Variables para la navegación 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Las Islas 
function MainTabs(){
  return(
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Inventario" component={InventarioScreen} />
      <Tab.Screen name="Producto" component={ProductoScreen} />
    </Tab.Navigator>
  )
}

// La Pila Principal (Stack)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {/* Pantallas base */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        
        {/* Pantallas que se enciman (Formularios) */}
        <Stack.Screen name="IngresoProducto" component={IngresoProductoScreen} />
        <Stack.Screen name="SalidaProducto" component={SalidaProductoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}