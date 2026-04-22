import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "../../types/product";

// ─── Interfaz del ítem de carrito ────────────────────────────────────────────
// Guardamos solo lo que necesitamos mostrar en el carrito.
// No guardamos el objeto Product completo para no tener datos obsoletos
// si el precio cambia en Supabase después de que el usuario lo agregó.
export interface CartItem {
  id: string;
  name: string;
  brand: string | null;
  price: number;
  quantity: number;
  image: string | null;
}

// ─── Forma del contexto ───────────────────────────────────────────────────────
// Esto es el "contrato": qué datos y funciones expone el contexto.
interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// ─── Creación del contexto ────────────────────────────────────────────────────
// createContext crea el "canal" por donde viajan los datos.
// El undefined inicial es el valor por defecto (antes de que el Provider lo llene).
const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "nubeo_cart";

// ─── Función para leer el carrito desde localStorage ─────────────────────────
// Se ejecuta una sola vez al inicializar el estado, no en cada render.
function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    // Si localStorage falla (modo privado, datos corruptos), arrancamos vacíos.
    return [];
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────
// Este componente envuelve la app y pone el carrito a disposición de todos.
// El prop "children" representa todo lo que está adentro del Provider.
export function CartProvider({ children }: { children: ReactNode }) {
  // useState(() => loadCart()) usa una función inicializadora:
  // React la llama una sola vez en el primer render, no en cada re-render.
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  // Cada vez que "items" cambia, sincronizamos con localStorage.
  // useEffect con [items] como dependencia se ejecuta después de cada cambio al carrito.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // useCallback evita recrear estas funciones en cada render, optimización menor
  // pero es buena práctica cuando se pasan funciones por contexto.

  const addToCart = useCallback((product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        // Si el producto ya está en el carrito, sumamos la cantidad.
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Si es nuevo, lo agregamos al final de la lista.
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          quantity,
          image: product.images[0] ?? null,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Valores derivados: calculados desde "items", se actualizan automáticamente.
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook useCart ─────────────────────────────────────────────────────────────
// Este hook es la puerta de entrada al contexto desde cualquier componente.
// El error es intencional: si alguien usa useCart() fuera del Provider,
// lo detectamos en desarrollo antes de que sea un bug silencioso en producción.
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}
