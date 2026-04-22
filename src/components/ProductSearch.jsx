import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function ProductSearch({ busqueda, setBusqueda }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="Coca Cola"
          placeholderTextColor="#A9A9A9"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3D161A',
    borderRadius: 15,
    elevation: 2,
  },
  iconButton: {
    padding: 10,
    paddingHorizontal: 15,
  },
  icon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1.5,
    backgroundColor: '#6A2E35',
    width: '80%',
    alignSelf: 'center',
    marginTop: 15,
  }
});