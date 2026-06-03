import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = (location.state as { orderId?: string } | null)?.orderId;

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      <main className="pt-16 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-lg w-full text-center py-16">
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

          <p className="text-[#00D4FF] text-xs uppercase tracking-[0.3em] mb-4">
            Pago Aprobado
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
            Pedido Confirmado
          </h1>

          {orderId ? (
            <div className="border border-[#1a1a1a] px-6 py-4 mb-8 inline-block">
              <p className="text-[#555] text-xs uppercase tracking-widest mb-1">
                Número de pedido
              </p>
              <p className="text-white font-mono text-sm break-all">
                {orderId}
              </p>
            </div>
          ) : (
            <div className="mb-8" />
          )}

          <p className="text-[#555] text-sm leading-relaxed mb-10 max-w-sm mx-auto">
            Recibirás un email con los detalles de tu compra. Tu pedido está
            siendo preparado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/catalogo")}
              className="bg-[#00D4FF] text-black font-bold px-8 py-4 text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              Seguir Comprando
            </button>

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
