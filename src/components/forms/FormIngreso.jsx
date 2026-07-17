import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
// CÓMO: Importar CameraView y useCameraPermissions de la librería moderna expo-camera (SDK 50+).
// POR QUÉ: Cumple con la restricción técnica de no usar la librería obsoleta expo-barcode-scanner.
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useProductos } from '../../hooks/useProductos';
import { COLORS } from '../../themes/colors';

export default function FormIngreso({ onBack }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // CÓMO: Encapsular todas las variables del formulario en estados locales (SRP).
  // POR QUÉ: Evita polucionar el componente de la pantalla y aísla la lógica del flujo de dos pasos.
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stockMinimo, setStockMinimo] = useState('');
  const [productoId, setProductoId] = useState(null);

  // Estados de la máquina de estados del Código de Barras (Módulo 4)
  const [verificado, setVerificado] = useState(false);
  const [existe, setExiste] = useState(false);
  const [verificando, setVerificando] = useState(false);
  
  const { buscarProductoPorCodigo, crearProducto, registrarLote, actualizarProducto, cargando } = useProductos();

  // CÓMO: Buscar el código de barras contra la API.
  // POR QUÉ: Si existe (200), autocompleta y bloquea nombre/categoría. Si no existe (404), desbloquea todos los campos silenciosamente.
  const verificarCodigo = async (code) => {
    if (!code || !code.trim()) {
      Alert.alert("Código requerido ⚠️", "Por favor ingresa un código de barras antes de verificar.");
      return;
    }
    setVerificando(true);
    try {
      const respuesta = await buscarProductoPorCodigo(code.trim());
      if (respuesta.exito && respuesta.producto) {
        const prod = respuesta.producto;
        setProductoId(prod.id);
        setNombre(prod.nombre);
        setPrecio(prod.precioBase?.toString() || prod.precio?.toString() || '');
        setCategoria(prod.categoria || '');
        setStockMinimo(prod.stockMinimo?.toString() || '0');
        setExiste(true);
        setVerificado(true);
        Alert.alert("Producto Encontrado 📦", `Se vinculó a: ${prod.nombre}. Metadatos fijos bloqueados.`);
      } else {
        // Caso B: El producto no existe (404). Se atrapa silenciosamente y habilita todo para registrar nuevo.
        setProductoId(null);
        setNombre('');
        setPrecio('');
        setCategoria('');
        setStockMinimo('');
        setExiste(false);
        setVerificado(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setVerificando(false);
    }
  };

  // CÓMO: Llamar a la acción PUT del catálogo comercial.
  // POR QUÉ: Permite al usuario del POS redefinir los precios o las alertas de stock mínimo de un producto existente.
  const manejarActualizarMetadatos = async () => {
    if (!precio.trim() || !stockMinimo.trim()) {
      Alert.alert("Campos incompletos ⚠️", "Por favor ingresa el precio base de venta y el stock mínimo.");
      return;
    }
    const res = await actualizarProducto(productoId, {
      precioBase: precio,
      stockMinimo: parseInt(stockMinimo) || 0
    });
    if (res.exito) {
      onBack();
    }
  };

  // CÓMO: Llamar al endpoint POST /api/lotes con la cantidad física de mercancía.
  // POR QUÉ: Aumenta el stock real del producto en el almacén de forma aislada.
  const manejarIngresarLote = async () => {
    if (!stock.trim()) {
      Alert.alert("Campo incompleto ⚠️", "Por favor ingresa la cantidad disponible para el lote físico.");
      return;
    }
    const res = await registrarLote(productoId, stock);
    if (res.exito) {
      onBack();
    }
  };

  // CÓMO: Encadenar la creación comercial del producto y el lote físico inicial.
  // POR QUÉ: Permite al usuario registrar un producto totalmente nuevo e ingresar su inventario físico en un solo submit.
  const manejarCrearProductoYLote = async () => {
    if (!nombre.trim() || !categoria.trim() || !precio.trim() || !stockMinimo.trim() || !stock.trim()) {
      Alert.alert("Campos incompletos ⚠️", "Por favor completa todos los metadatos y la cantidad de lote.");
      return;
    }
    // Paso 1: Crear la ficha de catálogo
    const resProd = await crearProducto({
      nombre,
      categoria,
      codigoBarras,
      precioBase: precio,
      stockMinimo: parseInt(stockMinimo) || 5
    });

    if (resProd.exito && resProd.producto) {
      // Paso 2: Encadenar creación del lote
      const resLote = await registrarLote(resProd.producto.id, stock);
      if (resLote.exito) {
        onBack();
      }
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
      setCodigoBarras(data);
      verificarCodigo(data);
    }
    setModalVisible(false);
  };

  const handleCodigoChange = (text) => {
    setCodigoBarras(text);
    // Bloquear todo si cambia el código para asegurar la máquina de estados
    setVerificado(false);
    setExiste(false);
  };

  const esNombreCategoriaEditable = verificado && !existe;
  const esGeneralEditable = verificado;

  return (
    <View style={styles.card}>
      
      <Text style={styles.label}>Código de Barras</Text>
      <View style={styles.scanInputContainer}>
        <TextInput 
          style={[styles.input, styles.scanInput]} 
          placeholder="Escriba o escanee el código" 
          value={codigoBarras} 
          onChangeText={handleCodigoChange} 
        />
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={() => verificarCodigo(codigoBarras)}
          disabled={verificando}
        >
          {verificando ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.scanButtonText}>🔍</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
          <Text style={styles.scanButtonText}>📷</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nombre del Producto</Text>
      <TextInput 
        style={[styles.input, !esNombreCategoriaEditable && styles.inputDisabled]} 
        value={nombre} 
        onChangeText={setNombre} 
        editable={esNombreCategoriaEditable}
        placeholder={!verificado ? "Verifique el código primero" : "Ingrese nombre de producto"}
      />

      <Text style={styles.label}>Categoría</Text>
      <TextInput 
        style={[styles.input, !esNombreCategoriaEditable && styles.inputDisabled]} 
        value={categoria} 
        onChangeText={setCategoria} 
        editable={esNombreCategoriaEditable}
        placeholder={!verificado ? "Verifique el código primero" : "Ej. Lácteos, Snacks, Bebidas"}
      />

      <Text style={styles.label}>Precio Base de Venta</Text>
      <TextInput 
        style={[styles.input, !esGeneralEditable && styles.inputDisabled]} 
        placeholder={!verificado ? "Verifique el código primero" : "S/."} 
        value={precio} 
        onChangeText={setPrecio} 
        keyboardType="numeric"
        editable={esGeneralEditable}
      />

      <Text style={styles.label}>Stock Mínimo Alerta</Text>
      <TextInput 
        style={[styles.input, !esGeneralEditable && styles.inputDisabled]} 
        placeholder={!verificado ? "Verifique el código primero" : "Ej. 5"} 
        value={stockMinimo} 
        onChangeText={setStockMinimo} 
        keyboardType="numeric"
        editable={esGeneralEditable}
      />

      <Text style={styles.label}>Cantidad de Lote Físico</Text>
      <TextInput 
        style={[styles.input, !esGeneralEditable && styles.inputDisabled]} 
        value={stock} 
        onChangeText={setStock} 
        keyboardType="numeric"
        editable={esGeneralEditable}
        placeholder={!verificado ? "Verifique el código primero" : "Cantidad disponible en lote"}
      />

      {/* CÓMO: Renderizar dinámicamente los botones basados en la máquina de estados. */}
      {/* POR QUÉ: SRP. Si existe (Caso A) tiene dos flujos (PUT o POST). Si no existe (Caso B) tiene uno (POST + POST). */}
      <View style={styles.actionsBlock}>
        <TouchableOpacity style={styles.cancelButton} onPress={onBack}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

        {verificado && (
          existe ? (
            <View style={styles.splitButtons}>
              <TouchableOpacity 
                style={[styles.actionBtn, styles.primaryBtn, (cargando || verificando) && styles.btnDisabled]} 
                onPress={manejarActualizarMetadatos}
                disabled={cargando || verificando}
              >
                {cargando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Actualizar Ficha</Text>}
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionBtn, styles.successBtn, (cargando || verificando) && styles.btnDisabled]} 
                onPress={manejarIngresarLote}
                disabled={cargando || verificando}
              >
                {cargando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Ingresar Lote</Text>}
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.actionBtn, styles.successBtn, styles.fullWidthBtn, (cargando || verificando) && styles.btnDisabled]} 
              onPress={manejarCrearProductoYLote}
              disabled={cargando || verificando}
            >
              {cargando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Crear Producto y Lote</Text>}
            </TouchableOpacity>
          )
        )}
      </View>

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

    </View>
  );
}

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
    color: COLORS.secondary,
    marginBottom: 5,
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
  inputDisabled: {
    backgroundColor: '#EAEAEA',
    color: '#888',
    borderColor: '#D3D3D3',
  },
  scanInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 15,
  },
  scanInput: {
    flex: 1,
    marginBottom: 0,
  },
  scanButton: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
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
  actionsBlock: {
    marginTop: 10,
    gap: 12,
  },
  splitButtons: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  actionBtn: {
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fullWidthBtn: {
    width: '100%',
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
  },
  successBtn: {
    backgroundColor: '#2E6F40', // Verde corporativo
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
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