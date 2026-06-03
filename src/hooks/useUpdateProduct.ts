import { useState } from "react";
import { updateProduct } from "../repositories/productsRepository";
import type { UpdateProductInput } from "../types";

interface UseUpdateProductResult {
  updateProduct: (id: string, input: UpdateProductInput) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useUpdateProduct(): UseUpdateProductResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProductMutation = async (id: string, input: UpdateProductInput) => {
    try {
      setLoading(true);
      setError(null);
      await updateProduct(id, input);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar producto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct: updateProductMutation, loading, error };
}
