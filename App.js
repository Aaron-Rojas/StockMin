import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import InventarioScreen from './src/screens/InventarioScreen';
import ProductoScreen from './src/screens/ProductoScreen';

import IngresoProductoScreen from './src/screens/IngresoProductoScreen';
import SalidaProductoScreen from './src/screens/SalidaProductoScreen';

export default function App() {

 const [currentScreen, setCurrentScreen] = useState('login');
 
 const navegarA = (ruta) => {
    setCurrentScreen(ruta);
  };

 //Función para translado
if (currentScreen === 'login') {
    return <LoginScreen onLogin={() => navegarA('home')} />;
  } else if (currentScreen === 'home') {
    return <HomeScreen onNavigate={navegarA} />;
  } else if (currentScreen === 'inventario') {
    return <InventarioScreen onNavigate={navegarA} />;
  } else if (currentScreen === 'producto') {
    return <ProductoScreen onNavigate={navegarA} />;
  }else if (currentScreen === 'ingresoProducto') {  
    return <IngresoProductoScreen onNavigate={navegarA} />;
  }else if (currentScreen === 'salidaProducto') {  
    return <SalidaProductoScreen onNavigate={navegarA} />;
  }

  
  return (
  <LoginScreen/>
  //  <HomeScreen/>
  );
}
