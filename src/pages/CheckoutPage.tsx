import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useCart } from "../features/cart/CartContext";
import { useAuth } from "../features/auth/AuthContext";
import { createOrder } from "../repositories/ordersRepository";
import { supabase } from "../lib/supabase";
import { formatCLP } from "../utils/format";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY ?? "");

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: '"Space Mono", monospace',
      fontSize: "15px",
      fontSmoothing: "antialiased",
      "::placeholder": { color: "#555555" },
    },
    invalid: {
      color: "#ff4444",
      iconColor: "#ff4444",
    },
  },
  hidePostalCode: true,
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <p className="text-[#555] text-sm uppercase tracking-widest">
          Tu carrito está vacío
        </p>
        <button
          onClick={() => navigate("/catalogo")}
          className="border border-[#00D4FF] text-[#00D4FF] px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#00D4FF] hover:text-black transition-colors"
        >
          Ir al Catálogo
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setStripeError(null);
    setOrderError(null);

    const { data, error: fnError } = await supabase.functions.invoke(
      "create-payment-intent",
      {
        body: {
          amount: totalPrice,
          currency: "clp",
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            quantity: i.quantity,
          })),
        },
      },
    );

    if (fnError || !data?.clientSecret) {
      setStripeError("No se pudo iniciar el pago. Intentá de nuevo.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setStripeError("Error al leer los datos de la tarjeta.");
      setIsProcessing(false);
      return;
    }

    const { error: paymentError, paymentIntent } =
      await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name, email },
        },
      });

    if (paymentError) {
      setStripeError(paymentError.message ?? "Error al procesar el pago.");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        const order = await createOrder({
          userId: user!.id,
          total: totalPrice,
          stripePaymentId: paymentIntent.id,
          items,
        });

        clearCart();
        navigate("/pedido-confirmado", {
          state: { orderId: order.id },
        });
      } catch (orderError) {
        console.error("Pago exitoso pero error al guardar pedido:", orderError);
        setOrderError(
          `Tu pago fue procesado exitosamente. Hubo un problema al guardar tu pedido, por favor contactá a soporte con este número: ${paymentIntent.id}`,
        );
        setIsProcessing(false);
      }
    }
  };

  return (
    <main className="pt-16 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-10">
        <p className="text-[#555] text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-2">
          Nubeo Store
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
          Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="order-2 lg:order-1">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#555] mb-4 sm:mb-6">
            Resumen del Pedido
          </h2>

          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 sm:gap-4 border border-[#1a1a1a] p-3 sm:p-4"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#111] border border-[#222] flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[#333] text-[10px] sm:text-xs">
                      IMG
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs sm:text-sm font-medium truncate">
                    {item.name}
                  </p>
                  {item.brand && (
                    <p className="text-[#555] text-[10px] sm:text-xs">
                      {item.brand}
                    </p>
                  )}
                  <p className="text-[#555] text-[10px] sm:text-xs mt-1">
                    Cant: {item.quantity}
                  </p>
                </div>

                <p className="text-white text-xs sm:text-sm font-bold flex-shrink-0">
                  {formatCLP(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#222] pt-3 sm:pt-4">
            <div className="flex justify-between items-center">
              <span className="text-[#555] text-[10px] sm:text-xs uppercase tracking-widest">
                Total
              </span>
              <span className="text-white text-lg sm:text-2xl font-bold">
                {formatCLP(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#555] mb-4 sm:mb-6">
            Datos de Pago
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-[#555] mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Juan Pérez"
                className="w-full bg-[#0d0d0d] border border-[#222] text-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-[#00D4FF] transition-colors placeholder-[#333]"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-[#555] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full bg-[#0d0d0d] border border-[#222] text-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-[#00D4FF] transition-colors placeholder-[#333]"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-[#555] mb-2">
                Datos de Tarjeta
              </label>
              <div
                id="stripe-card-element"
                className="w-full bg-[#0d0d0d] border border-[#222] px-3 sm:px-4 py-3 sm:py-4 focus-within:border-[#00D4FF] transition-colors"
              >
                <CardElement options={CARD_ELEMENT_OPTIONS} />
              </div>

              <p className="text-[#333] text-[10px] sm:text-xs mt-2">
                Modo test — usá: 4242 4242 4242 4242 · cualquier fecha futura ·
                cualquier CVC
              </p>
            </div>

            {stripeError && (
              <div className="border border-red-900 bg-red-950/30 px-4 py-3">
                <p className="text-red-400 text-sm">{stripeError}</p>
              </div>
            )}

            {orderError && (
              <div className="border border-yellow-900 bg-yellow-950/30 px-4 py-3">
                <p className="text-yellow-400 text-sm">{orderError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || isProcessing || items.length === 0}
              className="w-full bg-[#00D4FF] text-black font-bold py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isProcessing
                ? "Procesando..."
                : `Confirmar y Pagar ${formatCLP(totalPrice)}`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[#333] text-[10px] sm:text-xs">
              <svg
                className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Pago seguro con Stripe</span>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <Footer />
    </div>
  );
}
