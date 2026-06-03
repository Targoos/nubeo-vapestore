import { useState, useEffect } from "react";
import type { Order } from "../types";
import { getOrdersByUser } from "../repositories/ordersRepository";
import { useAuth } from "../features/auth/AuthContext";

export function useOrders() {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;
    
    async function fetchOrders() {
      try {
        setLoading(true);
        setError(null);
        const orders = await getOrdersByUser(user!.id);
        setData(orders);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar órdenes",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { data, loading, error };
}