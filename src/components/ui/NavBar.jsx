import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function NavBar({ activeRoute, setActiveRoute }) {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        style={[styles.navItem, activeRoute === 'home' && styles.activeItem]}
        onPress={() => setActiveRoute('home')}
      >
        <Text style={[styles.icon, activeRoute === 'home' && styles.activeIcon]}>🏠</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.navItem, activeRoute === 'inventario' && styles.activeItem]}
        onPress={() => setActiveRoute('inventario')}
      >
        <Text style={[styles.icon, activeRoute === 'inventario' && styles.activeIcon]}>📋</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.navItem, activeRoute === 'producto' && styles.activeItem]}
        onPress={() => setActiveRoute('producto')}
      >
        <Text style={[styles.icon, activeRoute === 'producto' && styles.activeIcon]}>📦</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#3D161A',
    borderRadius: 25,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 5,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  activeItem: {
    backgroundColor: '#F9C0C9',
  },
  icon: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  activeIcon: {
    color: '#3D161A',
  }
});