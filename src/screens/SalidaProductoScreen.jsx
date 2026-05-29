import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import FormVentas from '../components/forms/FormVenta';
import ProductSearch from '../components/forms/ProductSearch';
import HeaderBack from '../components/ui/HeaderBack';

export default function SalidaProductoScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('')

  const [nombre, setNombre] = useState('Chanka Kichachi 625ml'); 
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState(4.50); 
  const [total, setTotal] = useState(0);


  const cantidadNum = parseInt(cantidad) || 0;
  //lógica de Inventario
  useEffect( () =>{
    const nuevoTotal = cantidadNum * precio;
    setTotal(nuevoTotal)
  }
 ,[cantidad,precio]);

  const manejarGuardado = () => {
    if(cantidadNum <=0){
      Alert.alert(
        "Atención ⚠️",
        "Por favor, ingresa una cantidad válida mayor a 0 antes de guardar.",
        [{ text: "Entendido", style: "cancel" }]
      );
      return; 
    }

    Alert.alert(
      "Venta Exitosa",
      `Se registró la salida de ${cantidadNum} unidades de ${nombre}.\n\nIngreso total: S/ ${total.toFixed(2)}`,
      [
        { 
          text: "OK", 
          onPress: () => navigation.goBack() 
        }
      ]
    ); 

    console.log(`Se vendieron ${cantidad} unidades de ${nombre}. Ingreso total: S/ ${total.toFixed(2)}`);
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
          nombre={nombre}
          setNombre={setNombre}
          cantidad={cantidad}
          setCantidad={setCantidad}
          total={total.toFixed(2)}
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