import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../themes/colors';

// CÓMO: Crear un modal de pago reutilizable para el POS de StockMin.
// POR QUÉ: SRP. Desacopla la lógica financiera y la simulación del código QR (Yape/Efectivo) de la pantalla principal.
export default function ModalPago({ visible, onClose, totalAPagar, onConfirmarVenta }) {
  const [metodoPago, setMetodoPago] = useState('Efectivo'); // 'Efectivo' o 'Yape'

  const manejarConfirmacion = () => {
    if (onConfirmarVenta) {
      onConfirmarVenta(metodoPago);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          
          <Text style={styles.modalTitle}>Método de Pago</Text>
          
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Total a Pagar</Text>
            <Text style={styles.amountText}>S/ {totalAPagar.toFixed(2)}</Text>
          </View>

          {/* Opciones de pago */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={[
                styles.optionBtn, 
                metodoPago === 'Efectivo' && styles.optionBtnSelected
              ]} 
              onPress={() => setMetodoPago('Efectivo')}
            >
              <Text style={styles.optionEmoji}>💵</Text>
              <Text style={[
                styles.optionText, 
                metodoPago === 'Efectivo' && styles.optionTextSelected
              ]}>Efectivo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.optionBtn, 
                metodoPago === 'Yape' && styles.optionBtnSelected
              ]} 
              onPress={() => setMetodoPago('Yape')}
            >
              <Text style={styles.optionEmoji}>📱</Text>
              <Text style={[
                styles.optionText, 
                metodoPago === 'Yape' && styles.optionTextSelected
              ]}>Yape</Text>
            </TouchableOpacity>
          </View>

          {/* QR Simulado para Yape */}
          {metodoPago === 'Yape' && (
            <View style={styles.qrContainer}>
              <Text style={styles.qrLabel}>Escanea para yapear</Text>
              {/* CÓMO: Cargar la imagen local de Yape QR. */}
              {/* POR QUÉ: Reemplaza el mockup simulado de JSX por una imagen real del POS. */}
              <Image 
                source={require('../../assets/yape-qr.png')} 
                style={styles.qrImage} 
              />
              <Text style={styles.qrHelpText}>Minimarket "Todo Dar"</Text>
            </View>
          )}

          {/* Botones de acción */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.confirmBtn} onPress={manejarConfirmacion}>
              <Text style={styles.confirmBtnText}>Confirmar Venta</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25,
    width: '90%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  amountContainer: {
    backgroundColor: '#FFF5F0',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  amountLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  amountText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  optionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
    borderRadius: 15,
    paddingVertical: 14,
    backgroundColor: '#FAF5F2',
  },
  optionBtnSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF1F2',
  },
  optionEmoji: {
    fontSize: 20,
  },
  optionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#777',
  },
  optionTextSelected: {
    color: COLORS.primary,
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
    marginBottom: 20,
  },
  qrLabel: {
    fontSize: 13,
    color: '#555',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  qrImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  qrHelpText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmBtn: {
    flex: 1.5,
    backgroundColor: '#2E6F40', // Verde de confirmación
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
