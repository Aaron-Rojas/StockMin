import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function ConfirmButton({ onPress, title }) {
    title = 'Confirmar';
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2A0005', 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center', 
    marginTop: 20,
    elevation: 3,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});