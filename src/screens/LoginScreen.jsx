import { View, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import FormLog from '../components/forms/FormLog';
import TabButtons from '../components/ui/TabButtons';
import ConfirmButton from '../components/ui/ConfirmButton';

import { useAuth } from '../hooks/useAuth';

export default function LoginScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');    

  // CÓMO: Desestructurar iniciarSesion, obtenerSesion, cargando y error del custom hook.
  // POR QUÉ: Permite manejar la comunicación con el servidor y dar retroalimentación reactiva en la vista.
  const { iniciarSesion, obtenerSesion, cargando, error: errorAuth } = useAuth();

  useEffect(() => {
    const revisarLogeo = async () => {
      const emailGuardado = await obtenerSesion();
      if (emailGuardado) {
        console.log('Usuario detectado en memoria, saltando al Home:', emailGuardado);
        navigation.replace('MainTabs');
      }
    };
    revisarLogeo();
  }, []);

  // CÓMO: Validar localmente los campos y ejecutar el inicio de sesión enviando email y password.
  // POR QUÉ: Evita peticiones innecesarias al backend y condiciona la navegación al éxito de la API.
  const validarYContinuar = async () => {
    if (cargando) return;

    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos incompletos", "El correo y la contraseña son obligatorios.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Correo inválido", "Por favor ingresa un correo electrónico válido (ejemplo@correo.com).");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña débil", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (activeTab === 'registro') {
      if (!phone.trim()) {
        Alert.alert("Teléfono faltante", "El número de teléfono es obligatorio para registrarse.");
        return;
      }
      if (phone.length < 9) {
        Alert.alert("Teléfono inválido", "El número de teléfono debe tener al menos 9 dígitos.");
        return;
      }  
    }

    // CÓMO: Pasar email y password, evaluando de forma estricta el éxito devuelto por el hook useAuth.
    // POR QUÉ: Garantiza que la redirección a la app solo se realice bajo credenciales válidas y seguras.
    const respuesta = await iniciarSesion(email, password);
    if (respuesta && respuesta.exito) {
      navigation.replace('MainTabs');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />

          <TabButtons 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />

          <FormLog 
            activeTab={activeTab}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            phone={phone} setPhone={setPhone}
          />

          {cargando && (
            <Text style={styles.loadingText}>Iniciando sesión, por favor espere...</Text>
          )}

          {errorAuth && (
            <Text style={styles.errorText}>{errorAuth}</Text>
          )}

          <ConfirmButton 
            title="Confirmar" 
            onPress={cargando ? null : () => validarYContinuar()} 
          />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5F0', 
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40, 
  },
  logo: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  loadingText: {
    color: '#4A1C20',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: '#B70000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 14,
    paddingHorizontal: 20,
  }
});