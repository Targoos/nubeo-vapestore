import type { Order } from "../types";
import { formatCLP } from "../utils/format";

interface Props {
  order: Order | null;
  onClose: () => void;
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case "paid":
    case "shipped":
    case "delivered":
      return "text-green-400";
    case "pending":
      return "text-yellow-400";
    case "cancelled":
      return "text-red-400";
    default:
      return "text-[#444444]";
  }
};

export function OrderModal({ order, onClose }: Props) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
          <div>
            <h2 className="text-lg font-semibold text-white uppercase tracking-tight">
              Detalle del Pedido
            </h2>
            <p className="text-sm text-[#444444] mt-1">#{order.id.slice(0, 8)}</p>
          </div>
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

        {/* Modal Content */}
        <div className="p-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-[#444444] uppercase tracking-[0.15em] mb-1">Fecha</p>
              <p className="text-white">
                {new Date(order.created_at).toLocaleDateString("es-CL", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#444444] uppercase tracking-[0.15em] mb-1">Estado</p>
              <p className={`text-sm font-medium uppercase tracking-[0.1em] ${getStatusColor(order.status)}`}>
                {order.status}
              </p>
            </div>
          </div>

          {/* Items List */}
          {order.items && order.items.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-[0.15em] mb-4">
                Productos
              </h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-[#1a1a1a]">
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {item.product?.name || "Producto"}
                      </p>
                      <p className="text-xs text-[#444444] mt-1">
                        Cantidad: {item.quantity} x {formatCLP(item.unit_price)}
                      </p>
                    </div>
                    <p className="text-white font-semibold">
                      {formatCLP(item.quantity * item.unit_price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
            <p className="text-sm font-semibold text-white uppercase tracking-[0.15em]">
              Total
            </p>
            <p className="text-xl font-semibold text-[#00D4FF]">
              {formatCLP(order.total)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
