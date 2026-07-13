import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

export default function FormLog({ activeTab, email, setEmail, password, setPassword, nombre, setNombre }) {
  return (
    <View style={styles.container}>
      
      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        placeholderTextColor="#BDBDBD"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="*******"
        placeholderTextColor="#BDBDBD"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      
      {activeTab === 'registro' && (
        <>
          {/* CÓMO: Cambiar el campo de Teléfono por Nombre Completo. */}
          {/* POR QUÉ: Satisface los requerimientos de datos requeridos por la ruta POST /api/auth/register de la API. */}
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Aaron Rojas"
            placeholderTextColor="#BDBDBD"
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
          />
        </>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#632A30', 
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 14,
    color: '#333333',
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  }
});