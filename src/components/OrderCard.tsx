import type { Order } from "../types";

interface Props {
    order: Order
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

const formatCLP = (amount: number): string => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(amount);
};

export function OrderCard({ order }: Props) {
    const abbreviatedId = `#${order.id.slice(0, 8)}`;
    const statusColor = getStatusColor(order.status);
    const formattedTotal = formatCLP(order.total);
    const formattedDate = new Date(order.created_at).toLocaleDateString("es-CL", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-5 hover:border-[#00D4FF]/30 transition-colors duration-200">
            {/* Header: ID and Status */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-white uppercase tracking-[0.15em]">
                    {abbreviatedId}
                </span>
                <span className={`text-xs font-medium uppercase tracking-[0.1em] ${statusColor}`}>
                    {order.status}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#444444] uppercase tracking-[0.15em]">Total</span>
                    <span className="text-sm font-semibold text-white">{formattedTotal}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#444444] uppercase tracking-[0.15em]">Fecha</span>
                    <span className="text-sm text-[#444444]">{formattedDate}</span>
                </div>
            </div>
        </div>
    )
}