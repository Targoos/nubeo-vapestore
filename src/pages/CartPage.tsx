import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useCart } from "../features/cart/CartContext";

export function CartPage() {
  const {
    items: cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems: itemCount,
    totalPrice: subtotal,
  } = useCart();

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight flex items-center gap-3 sm:gap-4">
              MI CARRITO
              {itemCount > 0 && (
                <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-[#00D4FF] text-black rounded-full">
                  {itemCount}
                </span>
              )}
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="animate-fade-in-up delay-100 flex flex-col items-center justify-center py-24">
              <div className="w-24 h-24 mb-8 text-[#444444]">
                <EmptyCartIcon />
              </div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">
                TU CARRITO ESTA VACIO
              </h2>
              <p className="text-[#444444] text-sm mb-8">
                Agrega productos para comenzar tu compra
              </p>
              <Link
                to="/catalogo"
                className="px-8 py-3 bg-[#00D4FF] text-black text-xs font-semibold uppercase tracking-[0.1em] rounded-md hover:bg-[#00D4FF]/90 transition-colors"
              >
                VER PRODUCTOS
              </Link>
            </div>
          ) : (
            <div className="mt-6 sm:mt-10 flex flex-col lg:flex-row gap-6 lg:gap-10">
              <div className="lg:w-[65%] space-y-3 sm:space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fade-in-up bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-4 sm:p-6"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="w-full sm:w-24 h-24 sm:h-28 bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-12 h-16 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] rounded" />
                      </div>

                      <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <span className="text-xs text-[#444444] uppercase tracking-[0.1em]">
                            {item.brand}
                          </span>
                          <h3 className="mt-1 text-sm font-medium text-white">
                            {item.name}
                          </h3>
                          <p className="mt-2 text-[#00D4FF] font-semibold">
                            ${item.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                          <div className="flex items-center border border-[#1a1a1a] rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#444444] hover:text-white transition-colors"
                              aria-label="Disminuir cantidad"
                            >
                              <MinusIcon />
                            </button>
                            <span className="w-8 sm:w-10 text-center text-white text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#444444] hover:text-white transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <PlusIcon />
                            </button>
                          </div>

                          <div className="text-right min-w-[70px] sm:min-w-[80px]">
                            <span className="text-white font-semibold text-sm">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-[#444444] hover:text-white transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:w-[35%]">
                <div className="animate-fade-in-up delay-200 bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-4 sm:p-6 sticky top-24">
                  <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight mb-4 sm:mb-6">
                    RESUMEN DEL PEDIDO
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#444444]">Subtotal</span>
                      <span className="text-sm text-white">
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#444444]">Envio</span>
                      <span className="text-sm text-[#444444]">A calcular</span>
                    </div>
                  </div>

                  <div className="my-6 border-t border-[#1a1a1a]" />

                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <span className="text-base sm:text-lg font-bold text-white uppercase">
                      Total
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-[#00D4FF]">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <Link
                      to="/checkout"
                      className="w-full py-2.5 sm:py-3 bg-[#00D4FF] text-black text-xs font-semibold uppercase tracking-[0.1em] rounded-md hover:bg-[#00D4FF]/90 transition-colors flex items-center justify-center"
                    >
                      PROCEDER AL PAGO
                    </Link>
                    <Link
                      to="/catalogo"
                      className="w-full py-2.5 sm:py-3 bg-transparent text-white text-xs font-semibold uppercase tracking-[0.1em] rounded-md border border-white hover:bg-white/10 transition-colors flex items-center justify-center"
                    >
                      SEGUIR COMPRANDO
                    </Link>
                    <button
                      onClick={clearCart}
                      className="w-full py-2.5 sm:py-3 text-[#444444] text-xs font-medium uppercase tracking-[0.1em] hover:text-red-500 transition-colors"
                    >
                      VACIAR CARRITO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function EmptyCartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}
