import type { Product } from "../types";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const formatCLP = (amount: number): string => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(amount);
};

export function ProductsTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#1a1a1a]">
            <th className="text-left text-xs text-[#444444] uppercase tracking-[0.15em] px-6 py-4 font-medium">
              Imagen
            </th>
            <th className="text-left text-xs text-[#444444] uppercase tracking-[0.15em] px-6 py-4 font-medium">
              Nombre
            </th>
            <th className="text-left text-xs text-[#444444] uppercase tracking-[0.15em] px-6 py-4 font-medium">
              Categoría
            </th>
            <th className="text-left text-xs text-[#444444] uppercase tracking-[0.15em] px-6 py-4 font-medium">
              Precio
            </th>
            <th className="text-left text-xs text-[#444444] uppercase tracking-[0.15em] px-6 py-4 font-medium">
              Stock
            </th>
            <th className="text-left text-xs text-[#444444] uppercase tracking-[0.15em] px-6 py-4 font-medium">
              Estado
            </th>
            <th className="text-right text-xs text-[#444444] uppercase tracking-[0.15em] px-6 py-4 font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/30 transition-colors">
              <td className="px-6 py-4">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-12 h-12 bg-[#1a1a1a] rounded-md flex items-center justify-center">
                    <span className="text-[#444444] text-xs">Sin img</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <p className="text-white font-medium">{product.name}</p>
                <p className="text-xs text-[#444444] mt-1">{product.slug}</p>
              </td>
              <td className="px-6 py-4">
                <span className="text-[#444444]">
                  {product.category?.name || "Sin categoría"}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-white font-semibold">{formatCLP(product.price)}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-white">{product.stock}</span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`text-xs font-medium uppercase tracking-[0.1em] px-3 py-1 rounded-full ${
                    product.is_active
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {product.is_active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-[#444444] hover:text-[#00D4FF] transition-colors"
                    title="Editar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="p-2 text-[#444444] hover:text-red-400 transition-colors"
                    title="Eliminar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#444444]">No hay productos</p>
        </div>
      )}
    </div>
  );
}
