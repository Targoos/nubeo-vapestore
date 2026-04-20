import { useState, useEffect } from "react";
import type { Product } from "../types";
import { getProducts } from "../repositories/productsRepository";

interface ProductFilters {
  categoryId?: string;
  search?: string;
  onlyActive?: boolean;
}

interface UseProductsResult {
  data: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(filters: ProductFilters = {}): UseProductsResult {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const products = await getProducts(filters);
        setData(products);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar productos",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.categoryId, filters.search, filters.onlyActive]);

  return { data, loading, error };
}
