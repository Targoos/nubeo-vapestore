import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../features/auth/AuthContext";
import { OrderCard } from "../components/OrderCard";
import type { Order } from "../types";

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: orders, loading, error } = useOrders();
  const [displayedCount, setDisplayedCount] = useState(9);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleShowMore = () => {
    setDisplayedCount(prev => prev + 9);
  };

  const displayedOrders = orders?.slice(0, displayedCount) || [];
  const hasMoreOrders = orders && orders.length > displayedCount;

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

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Navbar />
      <main className="pt-16 px-6 lg:px-8 py-8 flex-1">
        <div className="max-w-7xl mx-auto">
          {/* Header with user info and sign out */}
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-6 mb-8 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-xs text-[#444444] uppercase tracking-[0.15em] mb-1">Email</p>
                  <p className="text-white">{user?.email}</p>
                </div>
                {user?.user_metadata?.full_name && (
                  <div>
                    <p className="text-xs text-[#444444] uppercase tracking-[0.15em] mb-1">Nombre</p>
                    <p className="text-white">{user.user_metadata.full_name}</p>
                  </div>
                )}
              </div>
              <button
                onClick={handleSignOut}
                className="border border-red-500/40 text-red-400 font-semibold uppercase tracking-[0.1em] px-6 py-2 rounded-md hover:bg-red-500/10 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="h-[calc(100vh-320px)] pt-4">
            <h1 className="text-xl font-semibold text-white uppercase tracking-tight mb-6">
              Mis Órdenes
            </h1>

            {loading && (
              <div className="text-center py-12">
                <p className="text-white">Cargando órdenes...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-12">
                <p className="text-red-400">Error al cargar las órdenes</p>
              </div>
            )}
            
            {orders && orders.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedOrders.map((order) => (
                    <div key={order.id} onClick={() => setSelectedOrder(order)} className="cursor-pointer">
                      <OrderCard order={order} />
                    </div>
                  ))}
                </div>
                {hasMoreOrders && (
                  <div className="text-center mt-8">
                    <button
                      onClick={handleShowMore}
                      className="border border-[#00D4FF]/40 text-[#00D4FF] font-semibold uppercase tracking-[0.1em] px-8 py-3 rounded-md hover:bg-[#00D4FF]/10 transition-colors"
                    >
                      Ver más
                    </button>
                  </div>
                )}
              </>
            ) : (
              !loading && !error && (
                <div className="text-center py-12">
                  <p className="text-[#444444]">No tienes órdenes aún</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
              <div>
                <h2 className="text-lg font-semibold text-white uppercase tracking-tight">
                  Detalle del Pedido
                </h2>
                <p className="text-sm text-[#444444] mt-1">#{selectedOrder.id.slice(0, 8)}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
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
                    {new Date(selectedOrder.created_at).toLocaleDateString("es-CL", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#444444] uppercase tracking-[0.15em] mb-1">Estado</p>
                  <p className={`text-sm font-medium uppercase tracking-[0.1em] ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </p>
                </div>
              </div>

              {/* Items List */}
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-[0.15em] mb-4">
                    Productos
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
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
                  {formatCLP(selectedOrder.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
