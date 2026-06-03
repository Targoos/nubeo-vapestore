# 🛒 Nubeo Vape Store

![React](https://img.shields.io/badge/React-19.2.5-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.9-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.2-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.104.0-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-9.2.0-635BFF?style=flat-square&logo=stripe&logoColor=white)

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://nubeo-vapestore.vercel.app)

## 📖 Descripción del Proyecto

**Nubeo Vape Store** es una aplicación web de e-commerce moderna para la venta de productos de vapeo. Desarrollada con las últimas tecnologías web, ofrece una experiencia de usuario fluida con autenticación segura, gestión de carrito de compras, pagos integrados con Stripe y un panel de administración completo.

## 🚀 Stack Tecnológico

### Frontend

- **React 19.2.5** - Biblioteca UI con Hooks y componentes modernos
- **TypeScript 6.0.2** - Tipado estático para mayor seguridad en el código
- **Vite 8.0.9** - Build tool ultra rápido para desarrollo
- **Tailwind CSS 4.2.2** - Framework CSS utility-first para estilos
- **React Router DOM 7.14.1** - Enrutamiento declarativo para SPA

### Backend & Servicios

- **Supabase 2.104.0** - Backend as a service (Base de datos, Auth, Storage)
- **Stripe 9.2.0** - Procesamiento de pagos seguro
- **Supabase Functions** - Edge functions para lógica de servidor

### Desarrollo

- **ESLint 9.39.4** - Linting para mantener calidad de código
- **@vitejs/plugin-react 6.0.1** - Plugin de React para Vite

## 🏗️ Arquitectura del Proyecto

```
nubeo-vapestore/
├── public/                 # Archivos estáticos
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/            # Imágenes y recursos
│   ├── components/        # Componentes reutilizables
│   │   ├── catalog/      # Componentes del catálogo
│   │   ├── ui/           # Componentes UI base
│   │   ├── CategoryCard.tsx
│   │   ├── DeleteConfirmationModal.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── OrderCard.tsx
│   │   ├── OrderModal.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductFormModal.tsx
│   │   └── ProductsTable.tsx
│   ├── features/         # Lógica de negocio por feature
│   │   ├── admin/       # Panel de administración
│   │   ├── auth/        # Autenticación
│   │   ├── cart/        # Carrito de compras
│   │   ├── catalog/     # Catálogo de productos
│   │   ├── checkout/    # Proceso de checkout
│   │   └── orders/      # Gestión de pedidos
│   ├── hooks/           # Custom React Hooks
│   │   ├── useCategories.ts
│   │   ├── useCreateProduct.ts
│   │   ├── useDeleteProduct.ts
│   │   ├── useOrders.ts
│   │   ├── useProduct.ts
│   │   ├── useProducts.ts
│   │   └── useUpdateProduct.ts
│   ├── lib/             # Utilidades y configuraciones
│   ├── pages/           # Páginas de la aplicación
│   │   ├── AdminPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CatalogPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── OrderConfirmationPage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── RegisterPage.tsx
│   ├── repositories/    # Capa de acceso a datos
│   ├── types/           # Definiciones TypeScript
│   │   ├── category.ts
│   │   ├── order.ts
│   │   └── product.ts
│   ├── utils/           # Funciones utilitarias
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── supabase/            # Configuración de Supabase
│   └── functions/       # Edge functions
├── .env.example         # Variables de entorno ejemplo
├── package.json         # Dependencias del proyecto
├── tsconfig.json        # Configuración TypeScript
├── vite.config.ts       # Configuración Vite
└── eslint.config.js     # Configuración ESLint
```

## ✨ Features Implementadas

### 👤 Autenticación

- ✅ Registro de usuarios
- ✅ Login/Logout seguro
- ✅ Login con Google (OAuth)
- ✅ Rutas privadas con protección
- ✅ Perfil de usuario

### 🛍️ Catálogo de Productos

- ✅ Listado de productos con filtros
- ✅ Vista detallada de productos
- ✅ Categorías de productos
- ✅ Búsqueda de productos

### 🛒 Carrito de Compras

- ✅ Agregar/eliminar productos
- ✅ Actualizar cantidades
- ✅ Cálculo de totales
- ✅ Persistencia de carrito

### 💳 Pagos

- ✅ Integración con Stripe
- ✅ Checkout seguro
- ✅ Confirmación de pedidos
- ✅ Manejo de errores de pago

### 👨‍💼 Panel de Administración

- ✅ CRUD de productos
- ✅ Gestión de categorías
- ✅ Tabla de productos
- ✅ Modal de edición/creación
- ✅ Confirmación de eliminación

### 📦 Pedidos

- ✅ Historial de pedidos
- ✅ Detalles de pedido
- ✅ Estado de pedidos
- ✅ Modal de visualización

## 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Supabase
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key

# Stripe
VITE_STRIPE_PUBLIC_KEY=tu_stripe_public_key
STRIPE_SECRET_KEY=tu_stripe_secret_key

# App
VITE_APP_URL=http://localhost:5173
```

### Obtener las credenciales

**Supabase:**

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a Settings → API
3. Copia la URL y la Anon Key

**Stripe:**

1. Crea una cuenta en [stripe.com](https://stripe.com)
2. Ve a Developers → API keys
3. Copia la Publishable key y Secret key

## 🛠️ Instalación y Ejecución Local

### Prerrequisitos

- Node.js 18+ instalado
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd nubeo-vapestore
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

5. **Construir para producción**

```bash
npm run build
```

6. **Previsualizar build de producción**

```bash
npm run preview
```

## 🌐 Deploy en Producción

El proyecto está desplegado en Vercel:  
**[https://nubeo-vapestore.vercel.app](https://nubeo-vapestore.vercel.app)**

### Deploy en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Deploy automático en cada push a main

## 📄 Licencia

MIT - Proyecto de portfolio

## 👨‍💻 Desarrollo

Desarrollado con ❤️ usando React, TypeScript y las mejores prácticas de desarrollo web moderno.
