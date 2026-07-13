import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORS } from '../../themes/colors';

export default function ConfirmButton({ onPress, title, loading, disabled }) {
  const label = title || 'Confirmar';
  const estaDeshabilitado = loading || disabled;

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        estaDeshabilitado && styles.buttonDisabled
      ]} 
      onPress={onPress}
      disabled={estaDeshabilitado}
    >
      {loading ? (
        // CÓMO: Cargar ActivityIndicator en lugar de texto al estar en modo de carga.
        // POR QUÉ: Otorga retroalimentación visual óptima y evita que el usuario realice múltiples clics.
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.secondary, 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center', 
    marginTop: 20,
    elevation: 3,
    minWidth: 150, // Evita variaciones bruscas de ancho al cambiar a cargando
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});