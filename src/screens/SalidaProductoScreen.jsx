import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, Modal } from 'react-native';
import React, { useState } from 'react';
// CÓMO: Importar CameraView y useCameraPermissions de expo-camera para escaneo directo.
// POR QUÉ: Implementa la experiencia física de escanear códigos de barras en el POS.
import { CameraView, useCameraPermissions } from 'expo-camera';

import FormVentas from '../components/forms/FormVenta';
import HeaderBack from '../components/ui/HeaderBack';
import ModalPago from '../components/salida/ModalPago';

import { useProductos } from '../hooks/useProductos';
import { useMovimientos } from '../hooks/useMovimientos';
import { COLORS } from '../themes/colors';

export default function SalidaProductoScreen({ navigation }) {
  const [codigoVenta, setCodigoVenta] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [modalPagoVisible, setModalPagoVisible] = useState(false);

  // Estados del escáner de cámara
  const [modalVisible, setModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const { buscarProductoPorCodigo, cargando: cargandoProductos } = useProductos();
  const { registrarVenta, cargando: cargandoVenta } = useMovimientos();
  
  const cargandoGeneral = cargandoProductos || cargandoVenta;

  // CÓMO: Consultar el catálogo comercial por código de barras e inyectar el ítem al carrito.
  // POR QUÉ: Lógica Barcode-First. Si existe, suma +1 a la cantidad del carrito; si no, lanza alerta y se limpia el input.
  const buscarYAgregarAlCarrito = async (code) => {
    if (!code || !code.trim()) {
      Alert.alert("Código requerido ⚠️", "Por favor ingresa o escanea un código de barras.");
      return;
    }

    const respuesta = await buscarProductoPorCodigo(code.trim());
    if (respuesta.exito && respuesta.producto) {
      const prod = respuesta.producto;
      setCarrito(prev => {
        const existente = prev.find(item => item.productoId === prod.id);
        if (existente) {
          return prev.map(item => 
            item.productoId === prod.id 
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        } else {
          return [...prev, {
            productoId: prod.id,
            nombre: prod.nombre,
            cantidad: 1,
            precio: parseFloat(prod.precioBase) || 0
          }];
        }
      });
      setCodigoVenta(''); // CÓMO: Limpiar input automáticamente. POR QUÉ: Permite escanear el siguiente producto sin interferencias.
    } else {
      // CÓMO: Lanzar alerta si es 404. POR QUÉ: Informa al cajero que la ficha comercial no existe en el catálogo.
      Alert.alert("Producto no encontrado ⚠️", "El código ingresado no está registrado en el catálogo comercial.");
    }
  };

  const handleScanPress = async () => {
    if (!permission) {
      return;
    }
    if (!permission.granted) {
      const permissionResponse = await requestPermission();
      if (!permissionResponse.granted) {
        Alert.alert(
          'Permiso Denegado 📷',
          'Para poder escanear códigos de barras, debes autorizar el uso de la cámara del dispositivo.'
        );
        return;
      }
    }

    setScanned(false);
    setModalVisible(true);
  };

  const handleBarcodeScanned = ({ data }) => {
    setScanned(true);
    if (data) {
      buscarYAgregarAlCarrito(data);
    }
    setModalVisible(false);
  };

  const totalAPagar = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

  const procederAlPago = () => {
    if (carrito.length === 0) {
      Alert.alert("Carrito vacío ⚠️", "Por favor agrega al menos un producto al carrito antes de proceder.");
      return;
    }
    setModalPagoVisible(true);
  };

  const confirmarVenta = async (metodoPago) => {
    setModalPagoVisible(false);

    // CÓMO: Enviar estrictamente el productoId y cantidad al backend.
    // POR QUÉ: Cumple con el contrato exacto de la API POST /api/ventas.
    const payload = {
      metodoPago,
      detalles: carrito.map(item => ({
        productoId: item.productoId,
        cantidad: item.cantidad
      }))
    };

    const res = await registrarVenta(payload);
    if (res.exito) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flexContainer}>
        
        <HeaderBack onBack={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.mainTitle}>Registro de venta</Text>

          {cargandoGeneral && (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginBottom: 15 }} />
          )}

          {/* Buscador e Ingreso de Códigos de Barras */}
          <Text style={styles.label}>Código de Barras</Text>
          <View style={styles.barcodeInputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Escriba o escanee el código" 
              value={codigoVenta} 
              onChangeText={setCodigoVenta} 
              onSubmitEditing={() => buscarYAgregarAlCarrito(codigoVenta)}
            />
            <TouchableOpacity 
              style={styles.addBtn} 
              onPress={() => buscarYAgregarAlCarrito(codigoVenta)}
            >
              <Text style={styles.btnIcon}>➕</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scanBtn} onPress={handleScanPress}>
              <Text style={styles.btnIcon}>📷</Text>
            </TouchableOpacity>
          </View>

          {/* Componente del Carrito de Compras */}
          <FormVentas
            carrito={carrito}
            setCarrito={setCarrito}
          />

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.btnCancel]} 
              onPress={() => navigation.goBack()}
              disabled={cargandoGeneral}
            >
              <Text style={styles.textBtn}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.btnSave, cargandoGeneral && { opacity: 0.5 }]} 
              onPress={cargandoGeneral ? null : procederAlPago}
              disabled={cargandoGeneral}
            >
              <Text style={styles.textBtn}>Cobrar Venta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        <View style={styles.footer} />

        {/* Modal de cobro y simulación QR */}
        <ModalPago
          visible={modalPagoVisible}
          onClose={() => setModalPagoVisible(false)}
          totalAPagar={totalAPagar}
          onConfirmarVenta={confirmarVenta}
        />

        {/* Modal de Escáner de Cámara */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.cameraContainer}>
            <CameraView
              style={StyleSheet.absoluteFillObject}
              barcodeScannerSettings={{
                barcodeTypes: ['qr', 'ean13', 'upc_a'],
              }}
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />
            <View style={styles.overlayContainer}>
              <TouchableOpacity 
                style={styles.cancelScanButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelScanButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 20,
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  barcodeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF5F0',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 15,
    padding: 12,
    color: '#333',
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
  },
  scanBtn: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
  },
  btnIcon: {
    fontSize: 20,
    color: '#FFF',
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
    backgroundColor: COLORS.secondary,
  },
  btnSave: {
    backgroundColor: '#2E6F40', // Verde de cobro/guardado corporativo
  },
  textBtn: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: COLORS.primary,
    height: 50,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  cancelScanButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cancelScanButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});