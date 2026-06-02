// ─── OrderConfirmationPage.tsx ────────────────────────────────────────────────
//
// Página de confirmación que se muestra DESPUÉS de un pago exitoso.
//
// Recibe el orderId via React Router navigation state:
//   navigate("/pedido-confirmado", { state: { orderId: paymentIntent.id } })
//   → useLocation().state?.orderId
//
// ¿Por qué navigation state y no query param?
// El orderId del PaymentIntent (pi_3ABC...) no tiene valor semántico en la URL.
// No necesitamos que sea shareable ni indexable. Navigation state es más limpio
// y desaparece si el usuario recarga la página (lo que queremos: evitar re-accesos).

import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // useLocation().state contiene lo que pasamos con navigate(..., { state: {...} })
  // Si el usuario llegó directo a esta URL (sin venir del checkout), orderId es null.
  const orderId = (location.state as { orderId?: string } | null)?.orderId;

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      <main className="pt-16 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-lg w-full text-center py-16">

          {/* ── Ícono de éxito ── */}
          {/* Un checkmark en el color de acento del proyecto */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 border-2 border-[#00D4FF] flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[#00D4FF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* ── Etiqueta superior ── */}
          <p className="text-[#00D4FF] text-xs uppercase tracking-[0.3em] mb-4">
            Pago Aprobado
          </p>

          {/* ── Título principal ── */}
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
            Pedido Confirmado
          </h1>

          {/* ── Número de pedido ── */}
          {/* Mostramos el Payment Intent ID de Stripe como número de referencia */}
          {orderId ? (
            <div className="border border-[#1a1a1a] px-6 py-4 mb-8 inline-block">
              <p className="text-[#555] text-xs uppercase tracking-widest mb-1">
                Número de pedido
              </p>
              <p className="text-white font-mono text-sm break-all">{orderId}</p>
            </div>
          ) : (
            <div className="mb-8" />
          )}

          {/* ── Mensaje de confirmación ── */}
          <p className="text-[#555] text-sm leading-relaxed mb-10 max-w-sm mx-auto">
            Recibirás un email con los detalles de tu compra.
            Tu pedido está siendo preparado.
          </p>

          {/* ── Acciones ── */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Botón principal: ir al catálogo */}
            <button
              onClick={() => navigate("/catalogo")}
              className="bg-[#00D4FF] text-black font-bold px-8 py-4 text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              Seguir Comprando
            </button>

            {/* Botón secundario: ver mis pedidos (cuando exista la página) */}
            <button
              onClick={() => navigate("/")}
              className="border border-[#333] text-[#555] px-8 py-4 text-xs uppercase tracking-widest hover:border-white hover:text-white transition-colors"
            >
              Ir al Inicio
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
