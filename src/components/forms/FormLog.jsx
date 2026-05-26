import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

export default function FormLog({ activeTab, email, setEmail, password, setPassword, phone, setPhone }) {
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
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="985586982"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
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