import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function ActionButtons({ onCancel, onSave }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.btnCancel]} onPress={onCancel}>
        <Text style={styles.text}>Cancelar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.btnSave]} onPress={onSave}>
        <Text style={styles.text}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20, 
    marginBottom: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    elevation: 3,
  },
  btnCancel: {
    backgroundColor: '#4A1C20', 
  },
  btnSave: {
    backgroundColor: '#B70000',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});