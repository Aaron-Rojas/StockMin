import { SafeAreaView, ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

import HeaderBack from '../components/ui/HeaderBack';
import FormIngreso from '../components/forms/FormIngreso';
import ActionButtons from '../components/ui/ActionButtons';
import { useProductos } from '../hooks/useProductos';

export default function IngresoProductoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        <HeaderBack onBack={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.mainTitle}>Ingreso de Producto</Text>

          <FormIngreso 
            onBack={() => navigation.goBack()}
          />
        </ScrollView>
        
        <View style={styles.footer} />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4EFEA', 
    paddingTop: 25
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 20,
  },
  footer: {
    backgroundColor: '#4A1C20',
    height: 50,
  }
});