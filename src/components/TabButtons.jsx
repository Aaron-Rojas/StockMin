import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function TabButtons({ activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, activeTab === 'registro' ? styles.activeBg : styles.inactiveBg]}
        onPress={() => setActiveTab('registro')}
      >
        <Text style={styles.text}>Registro</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, activeTab === 'login' ? styles.activeBg : styles.inactiveBg]}
        onPress={() => setActiveTab('login')}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#4A1C20',
    borderRadius: 25,
    marginHorizontal: 40,
    marginBottom: 30,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  activeBg: {
    backgroundColor: '#A60000',
  },
  inactiveBg: {
    backgroundColor: 'transparent',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});