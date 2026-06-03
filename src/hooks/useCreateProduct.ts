import { useState } from "react";
import { createProduct } from "../repositories/productsRepository";
import type { CreateProductInput } from "../types";

interface UseCreateProductResult {
  createProduct: (input: CreateProductInput) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useCreateProduct(): UseCreateProductResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProductMutation = async (input: CreateProductInput) => {
    try {
      setLoading(true);
      setError(null);
      await createProduct(input);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear producto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct: createProductMutation, loading, error };
}
