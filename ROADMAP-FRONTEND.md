# ROADMAP-FRONTEND: Plan de Integración de API REST

Este documento detalla la planificación y la guía paso a paso para realizar la integración técnica del frontend en React Native (desarrollado con Expo) con el backend en producción desplegado en Neon DB/Render, respetando la arquitectura **MVVM**, el uso de **Dumb Components** y sin modificar la estructura visual de las vistas.

---

## 🛠️ 1. Librerías Sugeridas y Stack Tecnológico

Para la conexión de red y la persistencia de seguridad requerida en la rúbrica, se seleccionan las siguientes librerías de la industria:

### A. Peticiones HTTP y Red: `axios`
*   **Por qué:** Axios permite crear instancias configurables, provee serialización automática de JSON y cuenta con un sistema robusto de **interceptores**. Esto nos permitirá inyectar el token JWT en cada petición saliente y capturar respuestas del servidor (como errores `401 Unauthorized`) de forma centralizada.
*   **Comando de instalación:**
    ```bash
    npm install axios
    ```

### B. Almacenamiento Seguro del JWT: `expo-secure-store`
*   **Por qué:** La rúbrica exige la persistencia del token de sesión. A diferencia de `AsyncStorage` (que guarda datos en texto plano y no es seguro para credenciales), `expo-secure-store` encripta los datos utilizando el llavero del sistema operativo (Keychain en iOS, Keystore en Android).
*   **Comando de instalación:**
    ```bash
    npx expo install expo-secure-store
    ```

### C. Variables de Entorno: `react-native-dotenv`
*   **Por qué:** Permite inyectar la URL de producción (`https://stockmin-backend.onrender.com`) desde un archivo `.env` local sin exponerla en el código fuente de control de versiones.
*   **Comando de instalación:**
    ```bash
    npm install react-native-dotenv
    ```

---

## 🔌 2. Configuración del Cliente HTTP Centralizado

Se creará un servicio centralizado de red en `src/services/api.js` que actuará como intermediario de todas las peticiones HTTP.

```javascript
// Ejemplo conceptual del cliente API centralizado en src/services/api.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';

const api = axios.create({
  baseURL: API_URL || 'https://stockmin-backend.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Peticiones: Inyecta el JWT guardado en SecureStore
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Respuestas: Detecta expiración de sesión (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Sesión expirada o token inválido. Redirigiendo...");
      await SecureStore.deleteItemAsync('userToken');
      // Aquí se debe disparar un evento global o limpiar el estado de autenticación
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 📈 3. Orden de Refactorización y Creación de Hooks

Para mantener el principio de responsabilidad única (SOLID) y garantizar un acoplamiento mínimo, se trabajará en el siguiente orden secuencial:

### 🔄 Fase 1: Refactorización de `useAuth.js` (Autenticación y Seguridad)
*   **Ubicación:** `src/hooks/useAuth.js`
*   **Endpoints a Conectar:** `POST /api/auth/login`
*   **Acciones:**
    1.  Reemplazar el mock actual de guardado por correo electrónico por la invocación HTTP a la API.
    2.  Migrar del uso de `AsyncStorage` a `expo-secure-store` para persistir de forma encriptada el JWT recibido en la clave `userToken`.
    3.  Exponer estados globales como `usuario` (con su nombre y rol), `cargando` (para loaders en pantalla) y `error` (para respuestas de contraseña inválida).

### 📦 Fase 2: Refactorización de `useProductos.js` (Gestión de Catálogo y Cámara)
*   **Ubicación:** `src/hooks/useProductos.js`
*   **Endpoints a Conectar:**
    *   `GET /api/productos` (Listado completo)
    *   `GET /api/productos/barcode/{barcode}` (Búsqueda nativa de la cámara)
    *   `POST /api/productos` (Creación de producto nuevo)
    *   `PUT /api/productos/{id}` (Actualización de stock y catálogo)
*   **Acciones:**
    1.  Reemplazar la lectura del archivo mock `productos.json` por llamadas asíncronas con la instancia de `api`.
    2.  Implementar la función de búsqueda por código de barras que será invocada por la cámara del móvil cuando se detecte un scanner exitoso.
    3.  Manejar estados locales en el hook: `productos` (arreglo), `cargando` (booleano) y `error` (mensaje).

### 🔄 Fase 3: Creación del nuevo hook `useMovimientos.js` (Responsabilidad Única)
*   **Ubicación:** `src/hooks/useMovimientos.js`
*   **Endpoints a Conectar:**
    *   `GET /api/movimientos` (Historial agrupado)
    *   `POST /api/movimientos` (Registro de entradas y salidas)
*   **Acciones:**
    1.  Aislar la lógica de historial de almacén en este hook para no sobrecargar el hook de catálogo.
    2.  Proveer métodos como `registrarMovimiento(tipo, cantidad, productoId, proveedor)` y `cargarHistorial(tipoFilter)`.
    3.  El hook debe formatear y proveer la estructura agrupada por fechas directamente al frontend para alimentar la interfaz.

---

## 🖥️ 4. Conexión de Capas en las Screens (Contenedores)

Siguiendo el patrón MVVM y de **Dumb Components**, las pantallas actuarán como controladores limpios:

1.  **`LoginScreen.jsx`**:
    *   Invoca `iniciarSesion` desde `useAuth`.
    *   Pasa loaders al botón e interactúa con alertas según el estado de `error`.
2.  **`ProductoScreen.jsx`**:
    *   Consume `productos` del hook `useProductos`.
    *   Pasa los atributos (`nombre`, `precio`, `stock`, `imagenUrl`) a los componentes presentacionales de tarjetas sin alterar sus estilos o JSX interno.
3.  **`InventarioScreen.jsx`**:
    *   Consume `listaMovimientos` agrupados y el filtro activo de `useMovimientos`.
    *   Pasa la información del historial a `CardEntradaInventario` y `CardSalidaInventario`.
4.  **`IngresoProductoScreen.jsx` / `SalidaProductoScreen.jsx`**:
    *   Consumen `registrarMovimiento` de `useMovimientos`.
    *   Pasan las funciones y estados de guardado a los formularios reutilizables `FormIngreso` y `FormVentas`.
