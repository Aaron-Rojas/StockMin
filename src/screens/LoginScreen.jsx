import { View, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, {useState} from 'react'

import FormLog from '../components/FormLog';
import TabButtons from '../components/TabButtons';
import ConfirmButton from '../components/ConfirmButton';

export default function LoginScreen({onLogin}) {
  
  const [activeTab, setActiveTab] = useState('registro');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');    
  
  const manejarConfirmacion = () => {
    console.log("Datos capturados:", email, password, phone);
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

          <ConfirmButton 
            title="Confirmar" 
            onPress={onLogin} 
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