import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {

 const [currentScreen, setCurrentScreen] = useState('login');
 
 //Función para translado
 const irAHome = () => {
    setCurrentScreen('home');
  }
  const irALogin = () => {
    setCurrentScreen('login');
  };

  if (currentScreen === 'login') {
    return <LoginScreen onLogin={irAHome} />;
  } else {
    return <HomeScreen onLogout={irALogin} />;
  }
  
  return (
  <LoginScreen/>
  //  <HomeScreen/>
  );
}
