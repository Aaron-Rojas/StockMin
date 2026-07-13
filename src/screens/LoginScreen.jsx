import { View, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import FormLog from '../components/forms/FormLog';
import TabButtons from '../components/ui/TabButtons';
import ConfirmButton from '../components/ui/ConfirmButton';

import { useAuth } from '../hooks/useAuth';

export default function LoginScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');    

  // CÓMO: Desestructurar login, register, checkSession y cargando de useAuth.
  // POR QUÉ: Permite autenticar al empleado y registrar nuevas cuentas consumiendo la API de producción.
  const { login, register, checkSession, cargando } = useAuth();

  useEffect(() => {
    const revisarLogeo = async () => {
      const emailGuardado = await checkSession();
      if (emailGuardado) {
        console.log('Usuario detectado en memoria, saltando al Home:', emailGuardado);
        navigation.replace('MainTabs');
      }
    };
    revisarLogeo();
  }, []);

  // CÓMO: Validar localmente los campos y ejecutar el inicio de sesión o registro según la pestaña activa.
  // POR QUÉ: Evita peticiones innecesarias al backend y condiciona la navegación al éxito de la API.
  const validarYContinuar = async () => {
    if (cargando) return;

    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos incompletos ⚠️", "El correo y la contraseña son obligatorios.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Correo inválido ⚠️", "Por favor ingresa un correo electrónico válido (ejemplo@correo.com).");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña débil ⚠️", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (activeTab === 'registro') {
      if (!nombre.trim()) {
        Alert.alert("Nombre faltante ⚠️", "El nombre completo es obligatorio para registrarse.");
        return;
      }
      if (nombre.trim().length < 3) {
        Alert.alert("Nombre inválido ⚠️", "El nombre debe tener al menos 3 caracteres.");
        return;
      }  
    }

    // CÓMO: Llamar a login o register evaluando el éxito del retorno del hook useAuth.
    // POR QUÉ: Asegura que el usuario sea redirigido a las secciones internas de StockMin solo tras una transacción HTTP exitosa. Las alertas se manejan centralizadamente.
    let respuesta;
    if (activeTab === 'registro') {
      respuesta = await register(email, password, nombre);
    } else {
      respuesta = await login(email, password);
    }

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

          {/* CÓMO: Deshabilitar el cambio de pestaña en TabButtons mientras se ejecuta la petición HTTP. */}
          {/* POR QUÉ: Evita estados inconsistentes si el usuario intenta interactuar durante la latencia. */}
          <TabButtons 
            activeTab={activeTab} 
            setActiveTab={cargando ? () => {} : setActiveTab} 
          />

          <FormLog 
            activeTab={activeTab}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            nombre={nombre} setNombre={setNombre}
          />

          {/* CÓMO: Pasar el prop loading al ConfirmButton. */}
          {/* POR QUÉ: Centraliza la prevención del doble tap y delega la renderización del ActivityIndicator al botón base. */}
          <ConfirmButton 
            title="Confirmar" 
            onPress={validarYContinuar} 
            loading={cargando}
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
  loadingIndicator: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  }
});