import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';

import FormVentas from '../components/forms/FormVenta';
import ProductSearch from '../components/forms/ProductSearch';
import HeaderBack from '../components/ui/HeaderBack';

export default function SalidaProductoScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  
  const totalSimulado = "15";

  const manejarGuardado = () => {
    console.log("Venta guardada:", { busqueda, nombre, cantidad });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flexContainer}>
        
        <HeaderBack onBack={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.mainTitle}>Registro de venta</Text>

          <ProductSearch busqueda={busqueda} setBusqueda={setBusqueda} />  

          <FormVentas
            nombre={nombre} setNombre={setNombre}
            cantidad={cantidad} setCantidad={setCantidad}
            total={totalSimulado}
          />

          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.button, styles.btnCancel]} onPress={() => navigation.goBack()}>
              <Text style={styles.textBtn}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.btnSave]} onPress={manejarGuardado}>
              <Text style={styles.textBtn}>Guardar Venta</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop:20,
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
  },
  btnCancel: {
    backgroundColor: '#4A1C20',
  },
  btnSave: {
    backgroundColor: '#B70000',
  },
  textBtn: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#4A1C20',
    height: 50,
  }
});