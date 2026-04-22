import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './features/cart/CartContext.tsx'
import { AuthProvider } from './features/auth/AuthContext.tsx'

// AuthProvider va por fuera de CartProvider porque en el futuro
// el carrito podría necesitar saber quién es el usuario (para sincronizar
// el carrito con la DB cuando el usuario esté logueado).
// El orden de los Providers importa: el de afuera está disponible para todos los de adentro.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
