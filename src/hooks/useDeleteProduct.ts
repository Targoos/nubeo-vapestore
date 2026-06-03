import { useState } from "react";
import { deleteProduct } from "../repositories/productsRepository";

interface UseDeleteProductResult {
  deleteProduct: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useDeleteProduct(): UseDeleteProductResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProductMutation = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteProduct(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar producto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct: deleteProductMutation, loading, error };
}
