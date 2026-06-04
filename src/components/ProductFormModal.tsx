import { useState, useEffect } from "react";
import type { Product, CreateProductInput } from "../types";
import type { Category } from "../types";

interface Props {
  product: Product | null;
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateProductInput) => Promise<void>;
}

export function ProductFormModal({
  product,
  categories,
  isOpen,
  onClose,
  onSave,
}: Props) {
  const [formData, setFormData] = useState<CreateProductInput>({
    name: "",
    slug: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
    brand: "",
    category_id: null,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description || "",
        price: product.price,
        stock: product.stock,
        images: product.images,
        brand: product.brand || "",
        category_id: product.category_id,
        is_active: product.is_active,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        price: 0,
        stock: 0,
        images: [],
        brand: "",
        category_id: null,
        is_active: true,
      });
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al guardar producto",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CreateProductInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
          <h2 className="text-lg font-semibold text-white uppercase tracking-tight">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#444444] hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-[#080808] border border-[#1a1a1a] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className="w-full bg-[#080808] border border-[#1a1a1a] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Categoría
              </label>
              <select
                value={formData.category_id || ""}
                onChange={(e) =>
                  handleChange("category_id", e.target.value || null)
                }
                className="w-full bg-[#080808] border border-[#1a1a1a] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] transition-colors"
              >
                <option value="">Sin categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Precio
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  handleChange("price", parseFloat(e.target.value) || 0)
                }
                className="w-full bg-[#080808] border border-[#1a1a1a] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] transition-colors"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  handleChange("stock", parseInt(e.target.value) || 0)
                }
                className="w-full bg-[#080808] border border-[#1a1a1a] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] transition-colors"
                required
                min="0"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Imagen URL
              </label>
              <input
                type="text"
                value={formData.images[0] || ""}
                onChange={(e) =>
                  handleChange("images", e.target.value ? [e.target.value] : [])
                }
                className="w-full bg-[#080808] border border-[#1a1a1a] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] transition-colors"
                placeholder="https://..."
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Marca
              </label>
              <input
                type="text"
                value={formData.brand ?? ""}
                onChange={(e) => handleChange("brand", e.target.value)}
                className="w-full bg-[#080808] border border-[#1a1a1a] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] transition-colors"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs text-[#444444] uppercase tracking-[0.15em] mb-2">
                Descripción
              </label>
              <textarea
                value={formData.description ?? ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full bg-[#080808] border border-[#1a1a1a] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] transition-colors resize-none"
                rows={4}
              />
            </div>

            <div className="col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => handleChange("is_active", e.target.checked)}
                  className="w-5 h-5 bg-[#080808] border border-[#1a1a1a] rounded focus:outline-none focus:border-[#00D4FF] accent-[#00D4FF]"
                />
                <span className="text-sm text-white">Producto activo</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#1a1a1a] text-white font-semibold uppercase tracking-[0.1em] py-3 rounded-md hover:bg-[#1a1a1a] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#00D4FF] text-black font-semibold uppercase tracking-[0.1em] py-3 rounded-md hover:bg-[#00D4FF]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : product ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
