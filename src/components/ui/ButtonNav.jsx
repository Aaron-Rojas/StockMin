import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Librería nativa de Expo

// Recibimos dos props: 
// activeTab: para saber qué botón pintar de rosado.
// onTabPress: la función que ejecutará el cambio de pantalla.
const BottomNav = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.navContainer}>
      
      {/* Botón Home */}
      <TouchableOpacity 
        style={[styles.navButton, activeTab === 'Home' && styles.activeButton]} 
        onPress={() => onTabPress('Home')}
      >
        <FontAwesome 
          name="home" 
          size={28} 
          color={activeTab === 'Home' ? '#541E2A' : '#541E2A'} 
        />
      </TouchableOpacity>

      {/* Botón Productos */}
      <TouchableOpacity 
        style={[styles.navButton, activeTab === 'Productos' && styles.activeButton]} 
        onPress={() => onTabPress('Productos')}
      >
        <FontAwesome 
          name="tags" // Ícono de etiqueta para productos
          size={24} 
          color={activeTab === 'Productos' ? '#541E2A' : '#541E2A'} 
        />
      </TouchableOpacity>

      {/* Botón Inventario */}
      <TouchableOpacity 
        style={[styles.navButton, activeTab === 'Inventario' && styles.activeButton]} 
        onPress={() => onTabPress('Inventario')}
      >
        <FontAwesome 
          name="clipboard" // Ícono de tabla de registro para inventario
          size={24} 
          color={activeTab === 'Inventario' ? '#541E2A' : '#541E2A'} 
        />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF7EE', // Tu fondo
    height: 70, // Altura estándar para no chocar con los bordes del celular
    borderTopWidth: 1,
    borderColor: '#E5E5E5', // Una línea sutil para separar del contenido
    // Sombras para que resalte un poco
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    elevation: 10, 
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20, // Bordes redondeados
  },
  activeButton: {
    backgroundColor: '#FEC6D2', // Tu rosado para el seleccionado
  }
});

export default BottomNav;