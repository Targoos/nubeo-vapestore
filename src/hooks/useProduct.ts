import { useState, useEffect } from "react";
import type { Product } from "../types";
import { getProductBySlug } from "../repositories/productsRepository";

interface UseProductResult {
  data: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(slug: string | undefined): UseProductResult {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("Producto no encontrado");
      return;
    }

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const product = await getProductBySlug(slug!);
        setData(product);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar el producto"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  return { data, loading, error };
}
