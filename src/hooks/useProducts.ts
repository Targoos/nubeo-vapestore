import { useState, useEffect, useCallback } from "react";
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
  refetch: () => Promise<void>;
}

export function useProducts(filters: ProductFilters = {}): UseProductsResult {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
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
  }, [filters.categoryId, filters.search, filters.onlyActive]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { data, loading, error, refetch: fetchProducts };
}
