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
Capa	Tecnología	Motivo
Frontend	React + TypeScript	Estándar del mercado, requerido en entrevistas
Estilos	Tailwind CSS	Utilidades rápidas, consistencia visual
UI Components	v0.dev → componentes React	Generación de UI consistente
Backend / DB	Supabase	PostgreSQL gestionado + Auth + Storage + API REST automática
Pagos	Stripe	Estándar internacional, muy valorado en CVs
Deploy	Vercel	Integración nativa con React, preview por PR
Control de versiones	GitHub	Repo por crear
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
***Arquitectura del proyecto
nubeo/
├── public/
├── src/
│   ├── assets/
│   ├── components/        # Componentes reutilizables (Button, Card, Modal, etc.)
│   ├── features/          # Módulos por dominio
│   │   ├── auth/          # Login, registro, sesión
│   │   ├── catalog/       # Catálogo, filtros, detalle de producto
│   │   ├── cart/          # Carrito de compras
│   │   ├── checkout/      # Flujo de pago con Stripe
│   │   ├── orders/        # Historial de pedidos
│   │   └── admin/         # Panel de administración
│   ├── repositories/      # Toda la comunicación con Supabase va aquí
│   │   ├── productsRepository.ts
│   │   ├── ordersRepository.ts
│   │   ├── categoriesRepository.ts
│   │   └── usersRepository.ts
│   ├── hooks/             # Custom hooks de React
│   ├── lib/               # Configuración de clientes (supabase.ts, stripe.ts)
│   ├── pages/             # Vistas principales
│   ├── types/             # Interfaces y tipos TypeScript
│   └── utils/             # Funciones auxiliares
├── .env                   # Variables de entorno (nunca en el repo)
├── .env.example           # Plantilla de variables sin valores reales
├── CLAUDE.md              # Este archivo
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
***Skills activos para este proyecto
Tulio tiene los siguientes skills instalados en Claude. Usarlos según el contexto:
Skill	Cuándo usarlo
`fullstack-developer`	Decisiones de arquitectura general
`senior-architect`	Estructura de carpetas, patrones, escalabilidad
`frontend-patterns`	Componentes React, hooks, estado
`vercel-react-best-practices`	Deploy, configuración, optimización
`nodejs-backend-patterns`	Lógica de servidor, APIs, middlewares
`backend-patterns`	Patrones generales de backend
`typescript-expert`	Tipado, interfaces, generics
`ui-ux-pro-max`	Diseño de interfaces, decisiones UX
`frontend-design`	Componentes visuales, Tailwind
`tdd` + `tdd-workflow`	Cuando se escriban tests
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
***Variables de entorno necesarias
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
# Stripe
VITE_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
# App
VITE_APP_URL=http://localhost:5173
***Progreso del proyecto

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
- Por qué las variables del frontend llevan prefijo VITE_
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

ADVERTENCIA: Categories.tsx y FeaturedProducts.tsx usan datos MOCK (arrays hardcodeados).
Los hooks useProducts y useCategories existen y están listos, pero AÚN NO están
conectados a ningún componente visual. Esta es la deuda técnica más urgente.

Conceptos aprendidos en sesión 4:
- IntersectionObserver: cómo detectar cuándo un elemento entra en pantalla para animar
- Query params en React Router: useSearchParams para leer ?categoria= y sincronizarlo con el estado de filtros
- Composición de páginas: una Page combina componentes de features + componentes compartidos
- Design tokens: por qué centralizar los valores de diseño evita inconsistencias
- Staggered animations: mostrar elementos uno tras otro con setTimeout para dar efecto visual

Commits realizados
Commit	Descripción	Sesión
1b32321	feat: build neo-brutalist ecommerce homepage	4
d681a3c	refactor: redesign components with aggressive brutalist style	4
cb682d9	feat: redesign components with dark tech aesthetic	4
bc3c481	feat: add smooth animations and Spanish translations	4
2b7120e	feat: create comprehensive designTokens file	4
398668e	refactor: restructure project directory into feature-based modules	4
9361150	feat: add catalog page and routing	4
d5ede8e	feat: implement full routing structure and update navigation	4

***Estado actual del código (2026-04-20)

COMPLETADO y funcional:
- src/lib/supabase.ts — cliente Supabase listo
- src/lib/designTokens.ts — tokens de diseño
- src/types/ — todas las interfaces TypeScript (Category, Product, Order, OrderItem)
- src/repositories/categoriesRepository.ts — getCategories, getCategoryBySlug, createCategory
- src/repositories/productsRepository.ts — getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct
- src/hooks/useProducts.ts — hook listo (NO conectado a UI todavía)
- src/hooks/useCategories.ts — hook listo (NO conectado a UI todavía)
- src/components/Navbar.tsx — navegación completa con React Router y query params
- src/components/Footer.tsx — footer
- src/components/CategoryCard.tsx — tarjeta de categoría
- src/components/ProductCard.tsx — tarjeta de producto
- src/features/catalog/Hero.tsx — hero animado (datos estáticos, no necesita Supabase)
- src/features/catalog/Categories.tsx — sección categorías (MOCK DATA — pendiente conectar)
- src/features/catalog/FeaturedProducts.tsx — productos destacados (MOCK DATA — pendiente conectar)
- src/pages/HomePage.tsx — landing page funcional visualmente
- src/pages/CatalogPage.tsx — catálogo completo con filtros (MOCK DATA — pendiente conectar)
- src/App.tsx — routing completo con todas las rutas definidas

VACÍOS (solo estructura de carpetas, sin código):
- src/features/auth/ — Login y registro (pendiente)
- src/features/cart/ — Carrito (pendiente)
- src/features/checkout/ — Checkout con Stripe (pendiente)
- src/features/orders/ — Historial de pedidos (pendiente)
- src/features/admin/ — Panel admin (pendiente)
- src/utils/ — sin archivos todavía
- src/repositories/ordersRepository.ts — no creado todavía

PÁGINAS PLACEHOLDER (archivo creado pero sin implementar):
- src/pages/ProductPage.tsx — detalle de producto
- src/pages/CartPage.tsx — carrito
- src/pages/CheckoutPage.tsx — checkout
- src/pages/LoginPage.tsx — login
- src/pages/RegisterPage.tsx — registro
- src/pages/AdminPage.tsx — panel admin

***Decisiones tomadas
Decisión	Alternativa descartada	Motivo
Supabase como backend	Node.js propio	Acelera el desarrollo, incluye Auth y DB integrados
Stripe para pagos	MercadoPago	Más documentación, mejor para portfolio internacional
v0.dev para UI	Stitch (Google)	Stitch pierde consistencia de estilos entre pantallas
Vite como bundler	Create React App	CRA está deprecado, Vite es el estándar actual
React Router para navegación	Next.js	Menor complejidad inicial, Next.js queda para KidsHub
Tailwind v4 + plugin Vite	Tailwind v3 con config.js	v4 es la versión actual, integración más limpia con Vite
Diseño dark tech (#080808 + #00D4FF)	Neo-brutalist	Más coherente visualmente, mejor para portfolio
Query params para filtros de catálogo	Estado global	Permite compartir URLs filtradas, más correcto para SEO

***Próximos pasos inmediatos
[x] Crear repositorio en GitHub llamado nubeo
[x] Definir esquema de base de datos en Supabase (tablas: categories, products, orders, order_items)
[x] Crear tipos TypeScript en src/types/ para cada entidad
[x] Crear los repositorios base en src/repositories/
[x] Crear custom hooks en src/hooks/ que usen los repositorios (useProducts, useCategories)
[x] Generar UI base de la landing y catálogo
[ ] URGENTE: Conectar Categories.tsx con useCategories (reemplazar mock data)
[ ] URGENTE: Conectar FeaturedProducts.tsx con useProducts (reemplazar mock data)
[ ] URGENTE: Conectar CatalogPage.tsx con useProducts (reemplazar mock data + habilitar filtros reales)
[ ] Insertar datos reales en Supabase (al menos 4 categorías + 10-15 productos de prueba)
[ ] Implementar ProductPage (detalle de producto con useProducts por slug)
[ ] Implementar carrito con Context API + localStorage (src/features/cart/)
[ ] Implementar auth con Supabase (LoginPage, RegisterPage, src/features/auth/)
[ ] Crear ordersRepository.ts
[ ] Deploy a Vercel
