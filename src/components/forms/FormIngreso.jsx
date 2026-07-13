import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
// CÓMO: Importar CameraView y useCameraPermissions de la librería moderna expo-camera (SDK 50+).
// POR QUÉ: Cumple con la restricción técnica de no usar la librería obsoleta expo-barcode-scanner.
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function FormIngreso({ 
  nombre, setNombre, 
  precio, setPrecio, 
  stock, setStock, 
  proveedor, setProveedor,
  codigoBarras, setCodigoBarras,
  onScanPress // Mantenemos la prop por compatibilidad, aunque ahora la lógica del modal está encapsulada aquí.
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  

  // Implementar una función asíncrona para validar y solicitar los permisos de la cámara de Expo.
  // Permite manejar de forma segura la denegación de permisos del sistema operativo y previene excepciones en tiempo de ejecución.
  const handleScanPress = async () => {
    // Si viene la prop onScanPress externa, la invocamos (por si se requiere tracking de analíticas
    if (onScanPress) {
      onScanPress();
    }
    if (!permission) {
      // Los permisos aún se están cargando
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

    // Reiniciar estado de escaneado y abrir el modal
    setScanned(false);
    setModalVisible(true);
  };

  // Callback al detectar exitosamente un código de barras.
  // Desestructura explícitamente { data } para extraer el string y asignarlo, cerrando el modal. 
  const handleBarcodeScanned = ({ data }) => {
    setScanned(true);
    if (data) {
      setCodigoBarras(data);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.card}>
      
      <Text style={styles.label}>Nombre del Producto</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Código de Barras</Text>
      <View style={styles.scanInputContainer}>
        <TextInput 
          style={[styles.input, styles.scanInput]} 
          placeholder="Escriba o escanee el código" 
          value={codigoBarras} 
          onChangeText={setCodigoBarras} 
        />
        {/* Usamos nuestra función local para controlar el escaneo físico */}
        <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
          <Text style={styles.scanButtonText}>📷</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Precio de Venta</Text>
      <TextInput style={styles.input} placeholder="S/." value={precio} onChangeText={setPrecio} keyboardType="numeric" />

      <Text style={styles.label}>Cantidad de Stock</Text>
      <TextInput style={styles.input} value={stock} onChangeText={setStock} keyboardType="numeric" />

      <Text style={styles.label}>Proveedor <Text style={styles.opcional}>* opcional</Text></Text>
      <TextInput style={styles.input} value={proveedor} onChangeText={setProveedor} />

      <Text style={styles.label}>Imagen <Text style={styles.opcional}>* opcional</Text></Text>
      
      {/* Botón simulado para subir foto */}
      <TouchableOpacity style={styles.photoButton} onPress={() => console.log('Abrir galería')}>
        <Text style={styles.cameraIcon}>📷</Text>
        <Text style={styles.photoText}>subir foto</Text>
      </TouchableOpacity>

      {/* CÓMO: Implementar un modal de pantalla completa para el escaneo de códigos.
          POR QUÉ: Mantiene la UI limpia en el formulario principal y aísla la inicialización de la cámara. */}
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
          {/* Superposición UI con el botón para abortar la lectura */}
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

    </View>
  );
}

// Conservamos los estilos existentes y añadimos los necesarios para el modal y la cámara
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A2E35',
    marginBottom: 5,
  },
  opcional: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#999',
  },
  input: {
    backgroundColor: '#FFF5F0',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    color: '#333',
  },
  scanInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  scanInput: {
    flex: 1,
    marginBottom: 0,
  },
  scanButton: {
    backgroundColor: '#6A2E35',
    padding: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
  },
  scanButtonText: {
    fontSize: 20,
    color: '#FFF',
  },
  photoButton: {
    backgroundColor: '#FFF5F0',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  cameraIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  photoText: {
    color: '#888',
    fontSize: 14,
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
    backgroundColor: '#6A2E35',
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