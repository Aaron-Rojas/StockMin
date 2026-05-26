import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function HeaderBack({ onBack, titulo }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backIcon}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.placeholder} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4A1C20', 
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A1C20',
  },
  placeholder: {
    flex: 1,
  }
});