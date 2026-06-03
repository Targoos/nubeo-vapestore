import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../features/auth/AuthContext";
import { OrderCard } from "../components/OrderCard";
import { OrderModal } from "../components/OrderModal";
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
    setDisplayedCount((prev) => prev + 9);
  };

  const displayedOrders = orders?.slice(0, displayedCount) || [];
  const hasMoreOrders = orders && orders.length > displayedCount;

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Navbar />
      <main className="pt-16 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        <div className="max-w-7xl mx-auto">
          {/* Header with user info and sign out */}
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 mt-6 sm:mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <div>
                  <p className="text-[10px] sm:text-xs text-[#444444] uppercase tracking-[0.15em] mb-1">
                    Email
                  </p>
                  <p className="text-white text-sm sm:text-base break-all">
                    {user?.email}
                  </p>
                </div>
                {user?.user_metadata?.full_name && (
                  <div>
                    <p className="text-[10px] sm:text-xs text-[#444444] uppercase tracking-[0.15em] mb-1">
                      Nombre
                    </p>
                    <p className="text-white text-sm sm:text-base">
                      {user.user_metadata.full_name}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={handleSignOut}
                className="border border-red-500/40 text-red-400 font-semibold uppercase tracking-[0.1em] px-4 sm:px-6 py-2 rounded-md hover:bg-red-500/10 transition-colors text-xs sm:text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="pt-4">
            <h1 className="text-lg sm:text-xl font-semibold text-white uppercase tracking-tight mb-4 sm:mb-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {displayedOrders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="cursor-pointer"
                    >
                      <OrderCard order={order} />
                    </div>
                  ))}
                </div>
                {hasMoreOrders && (
                  <div className="text-center mt-6 sm:mt-8">
                    <button
                      onClick={handleShowMore}
                      className="border border-[#00D4FF]/40 text-[#00D4FF] font-semibold uppercase tracking-[0.1em] px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-[#00D4FF]/10 transition-colors text-xs sm:text-sm"
                    >
                      Ver más
                    </button>
                  </div>
                )}
              </>
            ) : (
              !loading &&
              !error && (
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
      <OrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
