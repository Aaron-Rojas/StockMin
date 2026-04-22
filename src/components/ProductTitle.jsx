import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function ProductTitle() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aquí se encuentran todos{"\n"}tus productos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3D161A',
    textAlign: 'center',
  }
});