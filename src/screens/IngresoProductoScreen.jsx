import { SafeAreaView, ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';

import HeaderBack from '../components/ui/HeaderBack';
import FormIngreso from '../components/forms/FormIngreso';
import ActionButtons from '../components/ui/ActionButtons';

export default function IngresoProductoScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [proveedor, setProveedor] = useState('');

  const manejarGuardado = () => {
    console.log("Guardando:", { nombre, precio, stock, proveedor });
    // Después de guardar, regresamos al Home
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        <HeaderBack onBack={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.mainTitle}>Ingreso de Producto</Text>

          <FormIngreso 
            nombre={nombre} setNombre={setNombre}
            precio={precio} setPrecio={setPrecio}
            stock={stock} setStock={setStock}
            proveedor={proveedor} setProveedor={setProveedor}
          />

          <ActionButtons 
            onCancel={() => navigation.goBack()} 
            onSave={manejarGuardado} 
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
    paddingTop:25
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