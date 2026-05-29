import { View, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'

import FormLog from '../components/forms/FormLog';
import TabButtons from '../components/ui/TabButtons';
import ConfirmButton from '../components/ui/ConfirmButton';
import HomeScreen from './HomeScreen';

import { useAuth } from '../hooks/useAuth';

export default function LoginScreen({ navigation}) {
  
  const [activeTab, setActiveTab] = useState('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');    
  
  const {iniciarSesion, obtenerSesion} = useAuth();

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

  //Función para validar
  const validarYContinuar = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos incompletos ", "El correo y la contraseña son obligatorios.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Correo inválido ", "Por favor ingresa un correo electrónico válido (ejemplo@correo.com).");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña débil ", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (activeTab === 'registro') {
      if (!phone.trim()) {
        Alert.alert("Teléfono faltante ", "El número de teléfono es obligatorio para registrarse.");
        return;
      }
      if (phone.length < 9) {
        Alert.alert("Teléfono inválido", "El número de teléfono debe tener al menos 9 dígitos.");
        return;
        }  
    }
      await iniciarSesion(email);
      
      navigation.replace('MainTabs');
  }

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

          <ConfirmButton 
            title="Confirmar" 
            onPress={() => validarYContinuar()} 
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
  }
});