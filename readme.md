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

0. Ejecutar el un proyecto
```bash
npx expo start -c 
```

1. Crear el proyecto base en Expo:
```bash
npx create-expo-app stockmin-app --template blank
```

2. Instalación del núcleo de navegación:
```bash 
npm install @react-navigation/native
```

3. Instalación de dependencias nativas optimizadas para pantallas en Expo:
```bash
npx expo install react-native-screens react-native-safe-area-context
```

4. Instalación del enrutador de tipo Stack (Pilas):
```bash
npm install @react-navigation/native-stack
```

5. Instalación del enrutador de tipo Bottom Tabs (Pestañas inferiores):
```bash
npm install @react-navigation/bottom-tabs
```

6. Instalación de AsyncStorage:
```bash
npx expo install @react-native-async-storage/async-storage
```

7. Soporte para visualización en el entorno Web:
```bash
npx expo install react-native-web react-dom @expo/metro-runtime
```