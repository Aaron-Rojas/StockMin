# 🛒 StockMin - Sistema Móvil de Ventas e Inventario
### 📍 Minimarket "Todo Dar" (Huamanga, Ayacucho)

## 🎯 Propósito del Proyecto
Este proyecto consiste en el desarrollo de una solución móvil multiplataforma utilizando **React Native** y **Expo** para automatizar de manera integral los procesos de venta, registro de mercadería y control de stock en tiempo real del Minimarket "Todo Dar". 

La aplicación permite la transición digital del negocio, abandonando el control manual tradicional en papel y hojas de cálculo simples, mitigando deficiencias críticas como la falta de trazabilidad, el descalce de inventario y las pérdidas económicas causadas por el vencimiento de productos perecibles al no sistematizar la regla FIFO (First In, First Out).

## 🏗️ Arquitectura del Sistema: MVVM (Model-View-ViewModel)
Para garantizar la modularidad, un alto rendimiento visual y dejar el terreno preparado para la futura integración con el Backend, el proyecto implementa de manera estricta el patrón arquitectónico **MVVM**:

* **View (Vista - `/src/screens` y `/src/components`):** Capa responsable exclusiva de renderizar la interfaz gráfica y capturar los eventos del usuario (clicks, ingreso de texto). Está compuesta por componentes reutilizables y optimizados que carecen de lógica pesada de negocio.
* **ViewModel (Vista-Modelo - `/src/hooks`):** Actúa como el cerebro del componente. Implementado mediante Custom Hooks de React, centraliza los estados globales/locales, efectos secundarios, llamadas de datos y optimizaciones matemáticas, sirviendo la información ya procesada directamente a la Vista.
* **Model (Modelo / Capa de Datos - `/src/data`):** Representa las entidades de datos del negocio. En este avance está constituido por un archivo estructurado JSON (Mock local) que simula de forma fidedigna las respuestas de una API externa.

## 📁 Estructura del Repositorio
```text
/
├── App.js                 # Enrutador central (React Navigation - Stack & Tabs)      
└── /src                   # Código fuente principal
    ├── /assets            # Recursos imágenes
    ├── /data              # Mock local JSON
    ├── /hooks             # ViewModels (Custom Hooks para lógica aislada)
    ├── /themes            # Configuración global de estilos y paleta de colores
    └── /components        # Componentes modulares
        ├── /ui            # Elementos compartidos de interfaz 
        ├── /forms         # Formularios de captura de datos 
        ├── /home          # Componentes específicos del Dashboard principal
        ├── /inventario    # Componentes para el flujo de movimientos 
        └── /products      # Componentes del catálogo y tarjetas de stock crítico
```

## 🚀 Guía de Instalación y Despliegue

### Clonar y ejecutar el repositorio existente
Si ya cuentas con el repositorio y deseas levantar el entorno localmente, ejecuta:

1. Clonar el repositorio:
```bash
git clone https://github.com/Aaron-Rojas/StockMin
```

2. Instalar todas las dependencias del proyecto:
```bash
npm install
```

---

### Construcción del proyecto desde cero (Comandos de referencia)
En caso de requerir levantar un entorno idéntico desde cero, estos fueron los comandos utilizados en la arquitectura:

1. Ejecutar el un proyecto
```bash
npx expo start -c 
```

2. Crear el proyecto base en Expo:
```bash
npx create-expo-app stockmin-app --template blank
```

3. Instalación del núcleo de navegación:
```bash 
npm install @react-navigation/native
```

4. Instalación de dependencias nativas optimizadas para pantallas en Expo:
```bash
npx expo install react-native-screens react-native-safe-area-context
```

5. Instalación del enrutador de tipo Stack (Pilas):
```bash
npm install @react-navigation/native-stack
```

6. Instalación del enrutador de tipo Bottom Tabs (Pestañas inferiores):
```bash
npm install @react-navigation/bottom-tabs
```

7. Instalación de AsyncStorage:
```bash
npx expo install @react-native-async-storage/async-storage
```

8. Soporte para visualización en el entorno Web:
```bash
npx expo install react-native-web react-dom @expo/metro-runtime
```

9. Instalación de la librería de cámara nativa para lectura de códigos de barra:
```bash
npx expo install expo-camera
```

---

## 🔌 Integración Backend (API REST) y Seguridad

Para preparar la conexión del frontend React Native con el futuro backend en Node.js, se ha diseñado un contrato de datos estricto basado en el estándar **JSON Schema**. Este contrato se encuentra en la raíz del proyecto en el archivo [api-contrato.json]
### 🎯 Propósito del Contrato de API
El archivo `api-contrato.json` funciona como un acuerdo técnico y de validación entre ambas capas del desarrollo. Su propósito principal es:
1. **Validación Estricta:** Asegurar que los datos transmitidos tengan la estructura y tipos de datos correctos (ej. códigos de barras como cadenas, precios con formato de decimales, etc.).
2. **Garantía de Rúbrica (JWT & Cámara):** Definir los requerimientos de la autenticación JWT y especificar los endpoints y campos clave (`codigoBarras`) necesarios para el escaneo de códigos de barra por cámara (Expo Camera).

### 🔒 Autenticación, Registro y Persistencia de Sesión (Módulo 1)
*   **Propósito de la Funcionalidad:** Permitir el registro de nuevos usuarios en el sistema (`POST /api/auth/register`) y la autenticación de usuarios existentes (`POST /api/auth/login`) contra la base de datos central. Además, asegurar la sesión del empleado inyectando automáticamente el JWT en las cabeceras HTTP y controlando de manera segura la expiración del token mediante interceptores de Axios y almacenamiento cifrado.
*   **Instalación de Dependencias e Inicio del Entorno:**
    Para que el flujo de autenticación cifrado y las peticiones funcionen, el proyecto requiere `axios` y `expo-secure-store`. Instálelos con los siguientes comandos en la terminal:
    ```bash
    npm install axios
    npx expo install expo-secure-store
    ```
    Para iniciar el entorno móvil en modo de desarrollo con variables cargadas desde el archivo `.env`:
    ```bash
    npx expo start -c
    ```
*   **Componentes Clave Implementados:**
    1.  [api.js](file:///c:/Proyectos/Universidad/Ciclo_8/StockMin/src/services/api.js) (Modelo): Instancia centralizada de Axios configurada con interceptores para inyectar de forma asíncrona el JWT almacenado en `SecureStore`. Adicionalmente, cuenta con un interceptor de respuesta que limpia las credenciales automáticamente si el servidor responde con un código de error `401 Unauthorized`.
    2.  [useAuth.js](file:///c:/Proyectos/Universidad/Ciclo_8/StockMin/src/hooks/useAuth.js) (ViewModel): Proveedor de lógica asíncrona que expone los métodos `login`, `register` (para el registro con email, contraseña y nombre completo), `logout` y `checkSession` para la verificación automática al iniciar la app.
    3.  [LoginScreen.jsx](file:///c:/Proyectos/Universidad/Ciclo_8/StockMin/src/screens/LoginScreen.jsx) y [FormLog.jsx](file:///c:/Proyectos/Universidad/Ciclo_8/StockMin/src/components/forms/FormLog.jsx) (Vistas): Interfaz reactiva dividida en pestañas para alternar de forma nativa entre el inicio de sesión y el registro del empleado, consumiendo estados reactivos de carga (`cargando`) y errores interactivos (`errorAuth`).
*   **💡 Buenas Prácticas de Escalabilidad:**
    1.  **Expiración Automática y Renovación (Refresh Token):** Para futuras integraciones, es recomendable cambiar el flujo de un solo JWT persistente de larga duración por un esquema de `accessToken` (duración corta, 15 min) y `refreshToken` (duración larga, guardado en cookie httpOnly en el backend), actualizando de forma transparente el interceptor de Axios para interceptar el error 401, renovar el token en segundo plano y reintentar la petición original.
    2.  **Manejo de Roles:** Extender la respuesta del login/registro para almacenar el rol del usuario (ej. `cajero`, `administrador`) y usarlo para bloquear accesos visuales en el enrutamiento de pestañas del frontend de forma dinámica.
    3.  **Encriptación de Información Sensible:** Evitar almacenar contraseñas o datos personales en el estado global o almacenamiento local común (como AsyncStorage). Toda credencial debe ser guardada exclusivamente de forma encriptada mediante `SecureStore` (Keychain en iOS / Keystore en Android).

### 📷 Funcionalidad de Cámara y Código de Barras
* **Ruta de Búsqueda (`GET /api/productos/barcode/{barcode}`):** Permite buscar rápidamente un producto escaneado mediante la cámara. Si no se encuentra, retorna un error `404 Not Found`.
* **Ruta de Registro (`POST /api/productos`):** Permite registrar un producto nuevo de forma ágil asociando directamente el código de barras detectado por el dispositivo físico.
* **Integración en Formulario (`FormIngreso.jsx`):** Integra la funcionalidad de escaneo de códigos de barra mediante la cámara nativa utilizando la versión moderna de `expo-camera` (SDK 50+) a través de `<CameraView>`. La gestión de permisos se realiza dinámicamente utilizando el hook `useCameraPermissions()`. Además, el callback `onBarcodeScanned` extrae de manera explícita el string de la propiedad `data` para guardarlo en el estado del formulario, garantizando la consistencia del tipo de dato según lo establecido en `api-contrato.json`.


### 📦 Gestión de Movimientos de Inventario (Entradas/Salidas)
* **Ruta de Listado (`GET /api/movimientos`):** Obtiene los movimientos de inventario agrupados por día para alimentar directamente las vistas de historial en la aplicación. Soporta un parámetro de consulta `?tipo=entrada` o `?tipo=salida` para filtrar las transacciones.
  * **Estructura Esperada por el Frontend:** Retorna un arreglo de objetos agrupados por día con los campos `fechaDia` (ej. "Hoy"), `fechaMes` (ej. "22 de Abril"), `cantidadTotal` y una lista de `productos` con sus detalles individuales (`nombre`, `cantidad`, `hora`), que encaja de forma directa en las props requeridas por [InventarioScreen.jsx]
* **Ruta de Registro (`POST /api/movimientos`):** Registra una entrada (ingreso) o salida (venta/merma) de un producto.
  * **Cuerpo de Petición (`request`):** Exige obligatoriamente `tipo` ("entrada" o "salida"), `cantidad` (mínimo 1) y `productoId`. En el caso de ingresos, acepta de forma opcional el campo `proveedor` capturado en [IngresoProductoScreen.jsx]
  * **Captura de Usuario de Sesión:** El ID del usuario que registra el movimiento se extrae de manera segura en el backend a partir del token JWT enviado en el header `Authorization`, cumpliendo con estándares de seguridad al no requerir el `usuarioId` en el cuerpo de la petición.

### ⚙️ Configuración y Variables de Entorno (`.env`)
Para desacoplar el entorno de desarrollo y producción y ocultar las URLs de la futura API, se deben utilizar variables de entorno.
1. Instalar la dependencia necesaria en React Native para soporte de archivos `.env`:
   ```bash
   npm install react-native-dotenv
   ```
2. Crear un archivo `.env` en la raíz del proyecto:
   ```env
   API_URL=http://localhost:3000
   ```
3. Consumo en los hooks (`useProductos` y `useAuth`):
   ```javascript
   import { API_URL } from '@env';
   ```

### 💡 Buenas Prácticas para la Escalabilidad del Backend
Para el desarrollo de la futura API en Node.js, se recomiendan las siguientes directrices:
1. **Arquitectura Limpia (Clean Architecture / Layered):** Separar las rutas (controladores), la lógica de negocio (servicios) y el acceso a base de datos (repositorios/modelos) para un mantenimiento sencillo.
2. **Validación automática de Esquemas:** Usar librerías como `ajv` (Another JSON Schema Validator) en el backend de Node.js para validar de forma automática los cuerpos de petición (`requestBody`) contra el archivo `api-contrato.json`.
3. **Manejo Centralizado de Errores:** Implementar un middleware de Express para atrapar y formatear los errores bajo una estructura consistente, devolviendo códigos de estado HTTP semánticos (400, 401, 403, 404, 409, 500).
4. **Renovación de Tokens (Refresh Tokens):** Para mejorar la experiencia de usuario y la seguridad, implementar un mecanismo de refresh tokens que evite que el empleado deba iniciar sesión repetidas veces al expirar el token de acceso de corta duración.
5. **Migración a TypeScript:** Utilizar TypeScript en el backend para un tipado estricto que se corresponda exactamente con los esquemas del contrato JSON.

## 📦 Compilación y Distribución Android (APK sin Expo Go)

### 🎯 Propósito del Despliegue
Para realizar presentaciones del proyecto en entornos reales (como exposiciones universitarias) y prescindir de la dependencia de Expo Go, se utiliza **EAS Build** (Expo Application Services). Esto permite generar un paquete de aplicación Android instalable de forma nativa (`.apk`) compilado directamente en la nube de Expo.

### ⚙️ Requisitos y Comandos de Preparación

> [!IMPORTANT]
> **Recursos de Configuración Requeridos (Assets):**
> Para evitar errores durante la fase de *Prebuild* en EAS Build (por ejemplo, errores tipo `ENOENT: no such file or directory` relacionados con imágenes), el proyecto debe contener obligatoriamente la carpeta `/assets` en la raíz con las imágenes definidas en [app.json](file:///c:/Proyectos/Universidad/Ciclo_8/StockMin/app.json): `icon.png`, `splash-icon.png`, `adaptive-icon.png` y `favicon.png`. Si estos archivos de recursos no existen, la fase de prebuild nativo fallará de forma automática.


1. **Instalación Global de EAS CLI:**
   Instala la interfaz de línea de comandos de EAS de forma global en tu máquina:
   ```bash
   npm install -g eas-cli
   ```

2. **Iniciar Sesión en Expo:**
   Vincula tu terminal con tu cuenta de Expo Developer:
   ```bash
   eas login
   ```

3. **Inicialización y Vinculación del Proyecto:**
   Genera la conexión entre el código local y los servidores de Expo (esto creará o configurará los identificadores del proyecto):
   ```bash
   eas build:configure
   ```

### 🛠️ Configuración de Compilación (`eas.json`)
La aplicación cuenta con un archivo `eas.json` en la raíz del proyecto configurado específicamente con un perfil llamado `preview` que cambia el tipo de salida por defecto (`.aab` para Google Play Store) por un paquete instalable `.apk`:

```json
{
  "cli": {
    "version": ">= 10.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_API_URL": "https://stockmin-backend.onrender.com"
      }
    },
    "production": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://stockmin-backend.onrender.com"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 🚀 Comando de Compilación Nube (Generación de APK)
Para iniciar la compilación remota de tu archivo `.apk` de prueba, ejecuta el siguiente comando:
```bash
eas build --platform android --profile preview
```
Al finalizar, la consola y el panel de Expo te proporcionarán un enlace de descarga directa y un código QR para instalar el `.apk` directamente en cualquier teléfono Android compatible.

### 💡 Buenas Prácticas de Escalabilidad en Despliegue
1. **Versionado Semántico (SemVer):** Incrementa la versión en `version` y `android.versionCode` en [app.json](file:///c:/Proyectos/Universidad/Ciclo_8/StockMin/app.json) con cada compilación de prueba para evitar confusiones de caché o problemas al sobrescribir instalaciones anteriores en los dispositivos.
2. **Uso de Credentials Managers:** Expo gestiona de forma automática los keystores y claves de firmado de Android. En entornos de producción reales, guarda una copia de seguridad de las credenciales de firmado generadas por Expo mediante el comando `eas credentials`.
3. **Optimización del Tamaño de la App:** Para reducir el peso final del APK, configura en `app.json` los recursos mínimos indispensables y utiliza compresión adecuada en las imágenes ubicadas en `/assets`.
