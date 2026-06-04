CLAUDE.md — Proyecto Nubeo
¿Qué es este archivo?
Este archivo es el contexto persistente del proyecto Nubeo. Al inicio de cada sesión nueva,
Tulio lo pega como contexto para que Claude retome exactamente donde se quedó, sin perder
información entre sesiones. Al final de cada sesión o después de cada commit importante,
este archivo debe actualizarse con el progreso real.
***Sobre Tulio
Frontend developer con ~5 años de experiencia profesional
Stack principal: Vue 2, Vue 3, Nuxt, algo de Symfony/PHP
Conocimientos de React y Node.js presentes pero difusos, necesitan consolidación
Autodidacta, aprende rápido y es muy aplicado
No habla inglés
En búsqueda activa de empleo apuntando a roles Fullstack o Frontend Senior
Usa Cursor, Claude, Gemini y ChatGPT como herramientas de desarrollo
Objetivo inmediato: tener un proyecto Fullstack real y defendible en entrevistas en ~1 mes
***Objetivo del proyecto
Nubeo es una tienda online de vapes y accesorios construida con React + Supabase + Stripe.
Cumple dos propósitos simultáneos:
Portfolio: demostrar capacidad Fullstack real en entrevistas de trabajo
Aprendizaje: consolidar React, aprender arquitectura backend, autenticación, pagos y deploy
Categorías de productos
Equipos (mods, pods, kits)
Atomizadores
Repuestos
Esencias / líquidos
***Stack tecnológico
Capa Tecnología Motivo
Frontend React 19.2.5 + TypeScript 6.0.2 Estándar del mercado, requerido en entrevistas
Estilos Tailwind CSS v4.2.2 Utilidades rápidas, consistencia visual
UI Components Componentes custom (shadcn/ui style) Button, Input, Checkbox reutilizables
Backend / DB Supabase 2.104.0 PostgreSQL gestionado + Auth + Storage + API REST automática
Pagos Stripe 9.2.0 Estándar internacional, muy valorado en CVs
Edge Functions Supabase Deno Para crear Payment Intent de Stripe de forma segura
Routing React Router DOM 7.14.1 Navegación client-side
Deploy Vercel Integración nativa con React, preview por PR
Control de versiones GitHub Repo activo
***Alcance completo del proyecto
Módulo público (sin login)
Landing page con hero, categorías destacadas y productos populares
Catálogo general con filtros por categoría
Página de detalle de producto (imágenes, descripción, precio, stock)
Carrito de compras (persistente en localStorage)
Módulo de usuario (con login)
Registro e inicio de sesión con Supabase Auth
Perfil de usuario
Historial de pedidos
Checkout con Stripe (tarjeta real en modo test)
Confirmación de pedido por email
Panel de administración (rol admin)
Gestión de productos: crear, editar, eliminar
Gestión de categorías
Vista de pedidos recibidos
Control de stock básico
\*\*\*Arquitectura del proyecto
nubeo/
├── public/
├── src/
│ ├── assets/
│ ├── components/ # Componentes reutilizables
│ │ ├── ui/ # Componentes UI base (Button, Input, Checkbox)
│ │ ├── catalog/ # Componentes específicos del catálogo (FilterSidebar, Pagination, MobileFilterDrawer)
│ │ ├── CategoryCard.tsx
│ │ ├── ProductCard.tsx
│ │ ├── Navbar.tsx
│ │ ├── Footer.tsx
│ │ ├── DeleteConfirmationModal.tsx
│ │ ├── ProductFormModal.tsx
│ │ ├── OrderCard.tsx
│ │ ├── OrderModal.tsx
│ │ └── ProductsTable.tsx
│ ├── features/ # Módulos por dominio
│ │ ├── auth/ # Login, registro, sesión (AuthContext)
│ │ ├── catalog/ # Catálogo, filtros, detalle de producto (Hero, Categories, FeaturedProducts)
│ │ ├── cart/ # Carrito de compras (CartContext)
│ │ ├── checkout/ # Flujo de pago con Stripe
│ │ ├── orders/ # Historial de pedidos
│ │ └── admin/ # Panel de administración
│ ├── repositories/ # Toda la comunicación con Supabase va aquí (Repository Pattern)
│ │ ├── productsRepository.ts
│ │ ├── categoriesRepository.ts
│ │ └── ordersRepository.ts
│ ├── hooks/ # Custom hooks de React (abstraen lógica de negocio)
│ │ ├── useCategories.ts
│ │ ├── useProducts.ts
│ │ ├── useProduct.ts
│ │ ├── useCreateProduct.ts
│ │ ├── useAuth.ts
│ │ └── index.ts
│ ├── lib/ # Configuración de clientes
│ │ ├── supabase.ts # Cliente Supabase
│ │ └── designTokens.ts # Tokens de diseño centralizados
│ ├── pages/ # Vistas principales
│ │ ├── HomePage.tsx
│ │ ├── CatalogPage.tsx
│ │ ├── ProductPage.tsx
│ │ ├── CartPage.tsx
│ │ ├── CheckoutPage.tsx
│ │ ├── LoginPage.tsx
│ │ ├── RegisterPage.tsx
│ │ ├── ProfilePage.tsx
│ │ ├── OrderConfirmationPage.tsx
│ │ └── AdminPage.tsx
│ ├── types/ # Interfaces y tipos TypeScript
│ │ ├── category.ts
│ │ ├── product.ts
│ │ ├── order.ts
│ │ ├── cart.ts
│ │ └── index.ts
│ ├── utils/ # Funciones auxiliares
│ │ ├── auth.ts # Utilidades de autenticación
│ │ └── format.ts # Formateo de precios, fechas, etc.
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── supabase/
│ └── functions/
│ └── create-payment-intent/ # Edge Function para Stripe
│ └── index.ts
├── .env # Variables de entorno (nunca en el repo)
├── .env.example # Plantilla de variables sin valores reales
├── CLAUDE.md # Este archivo
└── README.md
Reglas de arquitectura obligatorias
Repositorios por entidad: nunca hacer llamadas a Supabase directamente desde
un componente. Toda interacción con la base de datos pasa por los archivos en /repositories.
Variables de entorno: todas las URLs, claves de API y secrets van en .env.
Nunca hardcodear valores en el código.
Interfaces TypeScript por servicio: definir interfaces para cada entidad
(Product, Order, User, Category) en /types. Si en el futuro se migra de Supabase
a otro proveedor, solo cambia el repositorio, no la lógica de negocio.
Separación de responsabilidades: los componentes solo renderizan.
La lógica de datos va en hooks o repositorios.
Funciones auxiliares: todo lo que sea formateo, validaciones o utilidades va en /utils.
Tipos centralizados: todas las interfaces TypeScript van en /types, no en los componentes.

\*\*\*Patrones de arquitectura implementados
Repository Pattern

- Toda la comunicación con Supabase está encapsulada en /repositories
- Los repositorios exponen funciones puras (getProducts, createProduct, etc.)
- Los componentes nunca llaman directamente a supabase.from()
- Ventaja: si se cambia de Supabase a otro backend, solo se modifican los repositorios

Custom Hooks

- La lógica de negocio de React está en /hooks
- useCategories, useProducts, useProduct, useCreateProduct, useAuth
- Los hooks llaman a los repositorios y manejan estado (loading, error, data)
- Los componentes consumen los hooks, no los repositorios directamente
- Ventaja: reutilización de lógica, separación de concerns, testabilidad

Context API

- Estado global compartido: CartContext (carrito), AuthContext (autenticación)
- Los contexts envuelven la app en main.tsx
- Los componentes acceden al estado via hooks personalizados (useCart, useAuth)
- Ventaja: evitar prop drilling, estado compartido sin librerías externas

Edge Functions (Supabase Deno)

- create-payment-intent: Edge Function para crear Payment Intent de Stripe
- Se ejecuta en el servidor de Supabase, no en el cliente
- Usa SUPABASE_SERVICE_ROLE_KEY para saltar RLS y validar precios
- Valida stock, verifica productos activos, calcula total server-side
- Retorna client_secret para que el cliente complete el pago con Stripe Elements
- Ventaja: seguridad (nunca exponer STRIPE_SECRET_KEY en el cliente), validación de precios confiable

\*\*\*Flujo de Stripe con Edge Function

1. Usuario llega a CheckoutPage con items en el carrito
2. CheckoutPage llama a la Edge Function create-payment-intent con:
   - items: array de {id, quantity}
   - currency: "clp"
3. Edge Function valida:
   - Que los productos existan en Supabase
   - Que los productos estén activos (is_active = true)
   - Que haya stock suficiente
   - Calcula el total server-side (ignora el precio del cliente)
4. Edge Function crea Payment Intent en Stripe con el total calculado
5. Edge Function retorna client_secret al cliente
6. CheckoutPage usa client_secret con Stripe Elements para renderizar el formulario de tarjeta
7. Usuario completa el pago con Stripe Elements
8. Stripe confirma el pago y llama al webhook (pendiente de implementar)
9. Webhook crea el pedido en Supabase y vacía el carrito
   ***Skills activos para este proyecto
   Tulio tiene los siguientes skills instalados en Claude. Usarlos según el contexto:
   Skill Cuándo usarlo
   `fullstack-developer` Decisiones de arquitectura general
   `senior-architect` Estructura de carpetas, patrones, escalabilidad
   `frontend-patterns` Componentes React, hooks, estado
   `vercel-react-best-practices` Deploy, configuración, optimización
   `nodejs-backend-patterns` Lógica de servidor, APIs, middlewares
   `backend-patterns` Patrones generales de backend
   `typescript-expert` Tipado, interfaces, generics
   `ui-ux-pro-max` Diseño de interfaces, decisiones UX
   `frontend-design` Componentes visuales, Tailwind
   `tdd` + `tdd-workflow` Cuando se escriban tests
   ***Modalidad de tutoría — MUY IMPORTANTE
   Claude actúa como tutor técnico senior, no como generador de código ciego.
   Cómo debe comportarse Claude en cada sesión
   Antes de escribir código:
   Explicar qué se va a construir y por qué
   Explicar el concepto detrás: ¿qué es un hook? ¿qué es un repositorio? ¿por qué Supabase Auth?
   Explicar las alternativas que existen y por qué se elige esta
   Relacionar lo nuevo con lo que Tulio ya conoce: Vue → React, Symfony/PHP → Node/Supabase
   Cuando genera código:
   Explicar cada bloque o sección con comentarios detallados
   Señalar las decisiones de diseño: "esto lo hacemos así porque..."
   Advertir sobre errores comunes relacionados con ese código
   Nunca generar código sin explicar qué hace y por qué está estructurado así
   Después de generar código:
   Proponer una pregunta o ejercicio pequeño para verificar que Tulio entendió
   Sugerir qué explorar o construir a continuación
   Recordar actualizar el CLAUDE.md si hubo un avance importante
   Tono:
   En español siempre
   Directo, claro, sin condescendencia
   Como un compañero senior que explica con paciencia y profundidad
   Si Tulio pregunta algo ya explicado, responder sin problema, sin hacerlo sentir mal
   Lo que Claude NO debe hacer:
   Generar código sin explicarlo línea por línea o sección por sección
   Asumir que Tulio ya sabe algo sin verificarlo primero
   Dar respuestas cortas en temas nuevos para Tulio
   Saltarse el "por qué" de cualquier decisión técnica
   Usar términos en inglés sin explicarlos si no son obvios
   Cuando Tulio muestra código que escribió
   Esta es una parte fundamental del proceso de aprendizaje. Cuando Tulio comparte código
   propio, Claude debe:
   Leerlo completo antes de responder, no corregir el primer problema que encuentre
   Reconocer lo que está bien hecho antes de señalar errores, para que Tulio sepa
   qué patrones está aplicando correctamente
   Explicar cada problema encontrado:
   Qué está mal y por qué es un problema
   Qué consecuencia tendría ese código en producción (bug, mal rendimiento, seguridad, etc.)
   Cómo se hace correctamente y por qué esa forma es mejor
   Mostrar la versión corregida con comentarios que expliquen los cambios
   Nunca simplemente reescribir el código sin explicar qué cambió y por qué
   Diferenciar entre error real y preferencia de estilo: si algo funciona pero hay
   una forma más idiomática o profesional de hacerlo, explicarlo como mejora, no como error
   El objetivo no es que el código quede perfecto, sino que Tulio entienda por qué
   una forma es mejor que otra y pueda aplicarlo solo la próxima vez.
   \*\*\*Variables de entorno necesarias

# Supabase

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Stripe

VITE_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

# App

VITE_APP_URL=http://localhost:5173
\*\*\*Progreso del proyecto

Sesión 1 — Planificación
Estado: completada
Stack definido, arquitectura definida, alcance definido

Sesión 2 — Setup e infraestructura base
Estado: completada (2026-04-20)
Lo que se hizo:

- Proyecto inicializado con Vite + React + TypeScript
- Tailwind CSS v4 instalado y configurado como plugin de Vite
- Dependencias instaladas: @supabase/supabase-js, react-router-dom, @stripe/stripe-js
- Estructura de carpetas completa creada (features, repositories, hooks, lib, pages, types, utils)
- .env.example creado con todas las variables necesarias
- .env agregado al .gitignore (protección de claves)
- src/lib/supabase.ts creado — cliente de Supabase configurado con import.meta.env
- Conexión con Supabase verificada y funcionando
- RLS (Row Level Security) activado en el proyecto de Supabase

Conceptos aprendidos en sesión 2:

- Por qué Vite usa import.meta.env en lugar de process.env
- Por qué las variables del frontend llevan prefijo VITE\_
- Qué es un "cliente" en el contexto de Supabase (objeto HTTP, no conexión directa a DB)
- Cómo funciona RLS y por qué activarlo desde el inicio
- Por qué no se necesita Prisma cuando se usa Supabase

Sesión 3 — Esquema de base de datos, tipos TypeScript y repositorios base
Estado: completada (2026-04-20)
Lo que se hizo:

- Esquema SQL ejecutado en Supabase: tablas categories, products, orders, order_items
- Relaciones definidas con foreign keys y restricciones check() a nivel de DB
- src/types/category.ts creado — interfaz Category + CreateCategoryInput
- src/types/product.ts creado — interfaz Product + CreateProductInput + UpdateProductInput
- src/types/order.ts creado — interfaces Order, OrderItem + tipo OrderStatus
- src/types/index.ts creado — archivo barril para importar todos los tipos desde un solo lugar
- src/repositories/categoriesRepository.ts creado — getCategories, getCategoryBySlug, createCategory
- src/repositories/productsRepository.ts creado — getProducts (con filtros), getProductBySlug, createProduct, updateProduct, deleteProduct

Conceptos aprendidos en sesión 3:

- Repository Pattern: por qué toda comunicación con Supabase va en repositorios y no en componentes
- Desacoplamiento: si se migra de Supabase a otro proveedor, solo cambian los repositorios
- Snapshot de datos: por qué unit_price se guarda en order_items y no se lee de products
- Tipos opcionales con ?: cuándo usar propiedades opcionales (datos de JOIN vs datos base)
- Omit<> y Partial<>: utilitarios de TypeScript para derivar tipos de inputs desde interfaces base
- Query dinámica en Supabase: construir el query en pasos para aplicar filtros opcionales
- Diferencia entre category_id (siempre presente) y category? (solo si se hizo JOIN)

Sesión 4 — UI de la landing, catálogo y routing completo
Estado: completada (2026-04-20)
Lo que se hizo:

- src/lib/designTokens.ts creado — tokens de diseño centralizados (colores, espaciado, tipografía)
- Diseño oscuro "dark tech" implementado: fondo #080808, acento #00D4FF (cian), tipografía ajustada
- src/components/Navbar.tsx — Navbar fija con React Router (Link), links por categoría vía ?categoria=, icono de carrito con contador
- src/components/Footer.tsx — Footer completo
- src/components/CategoryCard.tsx — Tarjeta de categoría con animación de entrada
- src/components/ProductCard.tsx — Tarjeta de producto con animación de entrada
- src/features/catalog/Hero.tsx — Hero de landing con animaciones CSS, stats con conteo animado (IntersectionObserver), CTA buttons
- src/features/catalog/Categories.tsx — Sección de 4 categorías con íconos SVG y animación staggered
- src/features/catalog/FeaturedProducts.tsx — Sección de productos destacados con animación staggered
- src/pages/HomePage.tsx — Compone Hero + Categories + FeaturedProducts
- src/pages/CatalogPage.tsx — Catálogo completo: sidebar de filtros (categoría, marca, precio, stock), ordenamiento, paginación, drawer móvil, animaciones de entrada, sincronización con query params (?categoria=)
- src/hooks/useProducts.ts creado — hook que llama a productsRepository con filtros opcionales
- src/hooks/useCategories.ts creado — hook que llama a categoriesRepository
- src/App.tsx — Routing completo con React Router: /, /catalogo, /producto/:id, /carrito, /checkout, /login, /registro, /admin
- Commits realizados en GitHub con PRs mergeados

Conceptos aprendidos en sesión 4:

- IntersectionObserver: cómo detectar cuándo un elemento entra en pantalla para animar
- Query params en React Router: useSearchParams para leer ?categoria= y sincronizarlo con el estado de filtros
- Composición de páginas: una Page combina componentes de features + componentes compartidos
- Design tokens: por qué centralizar los valores de diseño evita inconsistencias
- Staggered animations: mostrar elementos uno tras otro con setTimeout para dar efecto visual

Sesión 5 — Integración de datos reales, ProductPage y useProduct
Estado: completada (2026-04-21)
Lo que se hizo:

- src/hooks/useProduct.ts creado — hook para obtener un producto individual por slug
- src/pages/ProductPage.tsx implementada con datos reales de Supabase:
  - Galería de imágenes con selector de miniaturas
  - Selector de cantidad (mín 1, máx product.stock)
  - Badge de stock (En Stock / Sin Stock)
  - Formato de precio en CLP (es-CL locale)
  - Tabs de Descripción y Reseñas (reseñas placeholder)
  - Breadcrumb de navegación
  - Estados de carga y error (404)
- src/features/catalog/Categories.tsx — CONECTADA a Supabase con useCategories (eliminado el mock)
  - Íconos SVG asignados por slug vía ICON_BY_SLUG map
  - Estados de carga (skeleton) y error
- src/features/catalog/FeaturedProducts.tsx — CONECTADA a Supabase con useProducts (eliminado el mock)
  - Filtra onlyActive: true, muestra los primeros 3 productos
  - Estados de carga y error
- src/pages/CatalogPage.tsx — CONECTADA a Supabase con useProducts + useCategories (eliminado el mock)
  - Filtros reales: categoría, marca (derivada de datos), precio, stock
  - Ordenamiento: relevancia, precio asc/desc, más nuevo
  - Paginación (UI presente, lógica pendiente de completar)

Conceptos aprendidos en sesión 5:

- useProduct vs useProducts: cuándo necesitar un hook para un ítem único
- Slug como identificador de URL: más legible y SEO-friendly que el ID numérico
- Datos opcionales con renderizado condicional: product.brand && <span>...
- useMemo para derivar datos: calcular las marcas disponibles sin re-renderizar innecesariamente
- Skeleton loading: mostrar placeholders con la forma del contenido real mientras carga

Sesión 6 — Carrito con Context API y localStorage
Estado: completada (2026-04-21)
Lo que se hizo:

- src/features/cart/CartContext.tsx CREADO — núcleo del carrito:
  - Interfaz CartItem (id, name, brand, price, quantity, image)
  - CartProvider: estado global del carrito con useState + useEffect para sincronizar localStorage
  - addToCart(product, quantity): suma cantidad si el producto ya existe, agrega si es nuevo
  - removeFromCart(id), updateQuantity(id, delta), clearCart()
  - totalItems y totalPrice: valores derivados calculados automáticamente
  - useCart(): hook con error explícito si se usa fuera del Provider
- src/main.tsx MODIFICADO — app envuelta con <CartProvider> en el nivel más alto
- src/pages/CartPage.tsx MODIFICADO — eliminado mock y useState local, usa useCart()
- src/pages/ProductPage.tsx MODIFICADO — botón "Agregar al Carrito" conectado a addToCart(product, quantity)
- src/components/Navbar.tsx MODIFICADO — cartCount hardcodeado reemplazado por totalItems de useCart(); botón carrito convertido en Link a /cart
- src/components/ProductCard.tsx MODIFICADO — prop onAddToCart añadido; botón "AGREGAR" usa e.stopPropagation() para no navegar al producto; cursor-pointer agregado
- src/features/catalog/FeaturedProducts.tsx MODIFICADO — pasa onAddToCart={() => addToCart(product, 1)} a ProductCard
- src/pages/CatalogPage.tsx MODIFICADO — pasa onAddToCart={() => addToCart(product, 1)} a ProductCard
- URL del carrito cambiada de /carrito a /cart en App.tsx y Navbar.tsx

Conceptos aprendidos en sesión 6:

- Context API vs Redux: para un carrito en portfolio, Context API es suficiente sin boilerplate extra
- Provider pattern: componente que envuelve la app y pone datos disponibles para todos sus hijos
- useState con función inicializadora: () => loadCart() se ejecuta solo una vez vs loadCart() que corre en cada render
- useEffect con dependencia [items]: sincronizar estado a localStorage después de cada cambio
- useCallback: evitar recrear funciones en cada render cuando se pasan por contexto
- e.stopPropagation() vs e.preventDefault(): stopPropagation detiene la burbuja de eventos (necesario dentro de <Link>); preventDefault cancela la acción nativa del browser
- Prop callback onAddToCart: patrón para que un componente hijo ejecute lógica definida por el padre

Commits realizados
Commit Descripción Sesión
1b32321 feat: build neo-brutalist ecommerce homepage 4
d681a3c refactor: redesign components with aggressive brutalist style 4
cb682d9 feat: redesign components with dark tech aesthetic 4
bc3c481 feat: add smooth animations and Spanish translations 4
2b7120e feat: create comprehensive designTokens file 4
398668e refactor: restructure project directory into feature-based modules 4
9361150 feat: add catalog page and routing 4
d5ede8e feat: implement full routing structure and update navigation 4
5fe5891 feat: implement ProductPage component with design tokens 5
cbb986e feat: implement product slug-based navigation and add useProduct hook 5
7088781 feat: integrate Supabase data for categories and products 5
e443101 feat: create CartPage component with design specs 6
(sin commit) feat: implement CartContext + connect cart to all components 6

\*\*\*Estado actual del código (2026-06-03)

COMPLETADO y funcionando:

- src/lib/supabase.ts — cliente Supabase listo
- src/lib/designTokens.ts — tokens de diseño centralizados
- src/types/ — todas las interfaces TypeScript (category.ts, product.ts, order.ts, cart.ts, index.ts)
- src/repositories/categoriesRepository.ts — getCategories, getCategoryBySlug, createCategory
- src/repositories/productsRepository.ts — getProducts (con filtros), getProductBySlug, createProduct, updateProduct, deleteProduct
- src/repositories/ordersRepository.ts — getOrders, getOrderById, createOrder
- src/hooks/useCategories.ts — conectado y funcionando
- src/hooks/useProducts.ts — conectado y funcionando
- src/hooks/useProduct.ts — hook para producto individual por slug
- src/hooks/useCreateProduct.ts — hook para crear productos
- src/hooks/useAuth.ts — hook para autenticación con Supabase
- src/hooks/index.ts — barrel de hooks
- src/utils/auth.ts — utilidades de autenticación
- src/utils/format.ts — formateo de precios (formatCLP)
- src/components/ui/ — componentes UI base (Button.tsx, Input.tsx, Checkbox.tsx)
- src/components/catalog/ — componentes del catálogo (FilterSidebar.tsx, Pagination.tsx, MobileFilterDrawer.tsx, FilterSection.tsx)
- src/components/Navbar.tsx — navegación, query params, Link al /cart, contador real de items, menú usuario
- src/components/Footer.tsx — footer completo
- src/components/CategoryCard.tsx — tarjeta de categoría reutilizable
- src/components/ProductCard.tsx — tarjeta de producto con botón AGREGAR funcional (onAddToCart)
- src/components/DeleteConfirmationModal.tsx — modal de confirmación para eliminar
- src/components/ProductFormModal.tsx — modal para crear/editar productos
- src/components/OrderCard.tsx — tarjeta de pedido en historial
- src/components/OrderModal.tsx — modal de detalle de pedido
- src/components/ProductsTable.tsx — tabla de productos en admin
- src/features/catalog/Hero.tsx — hero animado
- src/features/catalog/Categories.tsx — conectada a Supabase ✅
- src/features/catalog/FeaturedProducts.tsx — conectada a Supabase, pasa onAddToCart ✅
- src/features/cart/CartContext.tsx — Context API completo: addToCart, removeFromCart, updateQuantity, clearCart, localStorage ✅
- src/features/auth/AuthContext.tsx — Context API para autenticación: login, register, logout, user, session ✅
- src/pages/HomePage.tsx — landing page funcional con datos reales
- src/pages/CatalogPage.tsx — catálogo con filtros, datos reales, pasa onAddToCart ✅
- src/pages/ProductPage.tsx — detalle de producto con botón agregar al carrito funcional ✅
- src/pages/CartPage.tsx — carrito funcional: lista items, controles de cantidad, vaciar, total ✅
- src/pages/LoginPage.tsx — login con Supabase Auth ✅
- src/pages/RegisterPage.tsx — registro con Supabase Auth ✅
- src/pages/ProfilePage.tsx — perfil de usuario con historial de pedidos ✅
- src/pages/CheckoutPage.tsx — checkout con Stripe Elements, integración con Edge Function ✅
- src/pages/OrderConfirmationPage.tsx — página de confirmación de pedido ✅
- src/pages/AdminPage.tsx — panel admin con CRUD de productos ✅
- src/main.tsx — CartProvider y AuthProvider envuelven toda la app
- src/App.tsx — routing completo con rutas protegidas
- supabase/functions/create-payment-intent/index.ts — Edge Function para Stripe ✅

VACÍOS (solo estructura de carpetas, sin código):

- src/features/checkout/ — estructura creada pero sin componentes
- src/features/orders/ — estructura creada pero sin componentes
- src/features/admin/ — estructura creada pero sin componentes

\*\*\*Deuda técnica (funciona pero hay que mejorar)

- CatalogPage.tsx: la paginación tiene UI pero la lógica no está implementada (muestra todos los productos en una página)
- Hero.tsx: los stats (500+ productos, 50+ marcas) son valores hardcodeados
- ProductPage.tsx: el tab "Reseñas" muestra un placeholder. No existe tabla de reseñas en Supabase todavía
- App.css: contiene estilos del template de Vite que nunca se usan
- CartPage: no hay feedback visual al agregar (sin toast/notificación). El contador del Navbar cambia pero si el usuario está en otra pantalla no lo ve
- ProductCard: imagen del producto no se muestra (usa un placeholder gráfico en vez de la imagen real de Supabase)
- AdminPage: no hay gestión de categorías, solo productos
- AdminPage: no hay control de roles (cualquier usuario logueado puede acceder)

\*\*\*Decisiones tomadas
Decisión Alternativa descartada Motivo
Supabase como backend Node.js propio Acelera el desarrollo, incluye Auth y DB integrados
Stripe para pagos MercadoPago Más documentación, mejor para portfolio internacional
v0.dev para UI Stitch (Google) Stitch pierde consistencia de estilos entre pantallas
Vite como bundler Create React App CRA está deprecado, Vite es el estándar actual
React Router para navegación Next.js Menor complejidad inicial, Next.js queda para KidsHub
Tailwind v4 + plugin Vite Tailwind v3 con config.js v4 es la versión actual, integración más limpia con Vite
Diseño dark tech (#080808 + #00D4FF) Neo-brutalist Más coherente visualmente, mejor para portfolio
Query params para filtros de catálogo Estado global Permite compartir URLs filtradas, más correcto para SEO
