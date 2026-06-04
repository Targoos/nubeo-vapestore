import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "../../types/product";
import type { CartItem } from "../../types/cart";

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "nubeo_cart";

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const items = JSON.parse(stored) as CartItem[];
    // Migrate old cart items without stock field
    return items.map((item) => ({
      ...item,
      stock: item.stock ?? 999, // Default to high stock for legacy items
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const currentQuantity = existing?.quantity ?? 0;
      const newQuantity = currentQuantity + quantity;

      if (newQuantity > product.stock) {
        return prev;
      }

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item,
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          quantity,
          stock: product.stock,
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
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(item.stock, item.quantity + delta),
              ),
            }
          : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
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

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}
