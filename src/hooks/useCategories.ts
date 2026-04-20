import { useState, useEffect } from "react";
import type { Category } from "../types";
import { getCategories } from "../repositories/categoriesRepository";

interface UseCategoriesResult {
  data: Category[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesResult {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        const categories = await getCategories();
        setData(categories);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar categorías",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { data, loading, error };
}
