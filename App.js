import React from 'react';
// Importes de navegación
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// CÓMO: Importar la librería de iconos nativos de Expo (Ionicons) y los colores del tema de la aplicación.
// POR QUÉ: Permite renderizar la barra de navegación inferior con el estilo visual y paleta de colores corporativos del sistema.
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './src/themes/colors';

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

// Las Islas (Menú de pestañas inferior)
// ANÁLISIS CRÍTICO DE FALLOS ANTERIOR:
// Anteriormente, el Tab.Navigator no definía ninguna propiedad 'tabBarIcon' ni colores de realce en su estado activo,
// lo cual dejaba la barra de navegación sin indicadores visuales (íconos vacíos o faltantes), degradando la experiencia de usuario (UX).
// REFACTORIZACIÓN: Se implementa la configuración de screenOptions dinámica para inyectar iconos de Ionicons
// y etiquetas personalizadas en español ('Inicio', 'Movimientos', 'Catálogo') sin alterar el atributo 'name' del screen
// para no quebrar la lógica de redirecciones internas que puedan existir en la app móvil.
function MainTabs(){
  return(
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Inventario') {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          } else if (route.name === 'Producto') {
            iconName = focused ? 'pricetags' : 'pricetags-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen 
        name="Inventario" 
        component={InventarioScreen} 
        options={{ tabBarLabel: 'Movimientos' }}
      />
      <Tab.Screen 
        name="Producto" 
        component={ProductoScreen} 
        options={{ tabBarLabel: 'Catálogo' }}
      />
    </Tab.Navigator>
  )
}

// La Pila Principal (Stack)
export default function App() {
  return (
      // Solo se nombras los screen luego serán utilizado por "Replace"
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