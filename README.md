---

# **Frontend de la página web para una panadería**

Este proyecto corresponde a la interfaz de usuario de la página web para una panadería, desarrollada con **React**, **TypeScript**, y **Vite**. El frontend permite a los clientes interactuar con el catálogo de productos, realizar compras y gestionar sus pedidos, además de proporcionar herramientas para la gestión interna a los empleados y administradores.

## **Autores** ✒️

- Juan David Calderón Salamanca  
- Alejandro Castro  
- David Santiago Donney's Taborda  
- Santiago Escobar León  

---

## **Requerimientos previos**

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** v18 o superior
- **npm** v9 o superior  
  *(Ambos pueden descargarse desde [Node.js](https://nodejs.org/))*

---

## **Dependencias utilizadas** 🛠️

Este proyecto utiliza las siguientes dependencias y herramientas:

### **Estilo y Diseño**
- **[Tailwind CSS](https://tailwindcss.com/):** Para estilos rápidos y personalizables.  
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  ```

### **Estado Global**
- **[Redux Toolkit](https://redux-toolkit.js.org/):** Manejo del estado global de la aplicación.  
  ```bash
  npm install @reduxjs/toolkit react-redux redux-persist
  ```

### **Calidad del Código**
- **[ESLint](https://eslint.org/):** Configurado para TypeScript y React.  
  ```bash
  npm install eslint eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks eslint-config-prettier --save-dev
  ```

### **Enrutamiento**
- **[React Router Dom](https://reactrouter.com/):** Para gestionar las rutas de la aplicación.  
  ```bash
  npm install react-router-dom
  ```

### **Peticiones HTTP**
- **[Axios](https://axios-http.com/):** Cliente HTTP para la comunicación con el backend.  
  ```bash
  npm install axios
  ```

### **Iconografía**
- **[Lucide](https://lucide.dev/):** Biblioteca de iconos moderna y flexible.  
  ```bash
  npm install lucide-react
  ```

---

## **Instalación del proyecto**

Para instalar las dependencias del proyecto y configurarlo:

1. Clona el repositorio del frontend.
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```
2. Instala las dependencias.
   ```bash
   npm install
   ```
3. Configura Tailwind CSS si es necesario.
   ```bash
   npx tailwindcss init
   ```

---

## **Ejecutar la aplicación**

Para ejecutar la aplicación en un entorno de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

---

## **Tecnologías Utilizadas**

<div style="text-align: left">
    <p>
        <a href="https://vitejs.dev/" target="_blank"> <img alt="Vite" src="https://cdn.svgporn.com/logos/vitejs.svg" height="60" width="60"></a>
        <a href="https://react.dev/" target="_blank"> <img alt="React" src="https://cdn.svgporn.com/logos/react.svg" height="60" width="60"></a>
        <a href="https://www.typescriptlang.org/" target="_blank"> <img alt="TypeScript" src="https://cdn.svgporn.com/logos/typescript-icon.svg" height="60" width="60"></a>
    </p>
</div>

---

Este frontend es un componente esencial del sistema que complementa el backend desarrollado en **Spring** y utiliza una base de datos relacional para una integración completa.

---
