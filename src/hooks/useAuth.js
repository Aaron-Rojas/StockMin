import AsyncStorage from '@react-native-async-storage/async-storage';

//Variable -> usuarioActivo, en donde se almacená todo

export const useAuth = () => {

  // Guardar la sesión
  const iniciarSesion = async (email) => {
    try {
      await AsyncStorage.setItem('usuarioActivo', email);
      return true;
    } catch (error) {
        console.log(`Error al crear un AyncStorage ${error}`);
      return false;
    }
  };

  // Leer la variable Async
  const obtenerSesion = async () => {
    try {
      const email = await AsyncStorage.getItem('usuarioActivo');
      console.log(`Ok, Se guardó en AsyncStorage el usuario:`, {email})
      return email;
    } catch (error) {
      console.log(`Error al leer ${error}`)
      return null;
    }
  };

  // Borrar la sesión
  const cerrarSesion = async () => {
    try {
     await AsyncStorage.clear(); 
      console.log(' Delete, Memoria de AsyncStorage limpiada por completo');
      return true;
    } catch (error) {
      console.log(`Error al borrar la memoria: ${error}`);
      return false;
    }
}

  return { iniciarSesion, obtenerSesion, cerrarSesion };
};