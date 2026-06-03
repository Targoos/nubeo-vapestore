// ─── CheckoutPage.tsx ─────────────────────────────────────────────────────────
//
// Esta página maneja el flujo completo de pago con Stripe.
//
// ARQUITECTURA DEL COMPONENTE (importante entender antes de leer el código):
// ─────────────────────────────────────────────────────────────────────────────
//
// CheckoutPage
//   └── <Elements stripe={stripePromise}>   ← "Provider" de Stripe (como CartProvider)
//         └── <CheckoutForm />              ← aquí viven useStripe() y useElements()
//
// ¿Por qué dos componentes?
// useStripe() y useElements() solo funcionan DENTRO de un hijo de <Elements>.
// Si lo ponemos todo en un componente, Stripe no puede inicializarse a tiempo.
// Es el mismo patrón de Provider/Consumer que ya viste con CartContext y AuthContext.
//
// FLUJO COMPLETO DE PAGO:
//   1. Usuario llena nombre, email y datos de tarjeta (CardElement los tokeniza)
//   2. Al submit: llamamos a la Edge Function → obtenemos clientSecret
//   3. stripe.confirmCardPayment(clientSecret, card) → Stripe cobra la tarjeta
//   4. Si success → createOrder() en Supabase → clearCart() → redirect a confirmación
//   5. Si error → mostrar mensaje debajo del campo de tarjeta

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

// ─── Inicializar Stripe ───────────────────────────────────────────────────────
// loadStripe() se llama FUERA del componente, a nivel de módulo.
// ¿Por qué? Para que se ejecute una sola vez cuando el archivo se importa,
// no en cada render del componente. Stripe carga scripts externos de forma asíncrona.
// VITE_STRIPE_PUBLIC_KEY es la clave PÚBLICA (pk_test_...) — segura para el frontend.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY ?? "");

// ─── Estilos del CardElement ──────────────────────────────────────────────────
// CardElement es un iframe de Stripe — los números de tarjeta nunca tocan nuestro código.
// Le pasamos estilos para que se integre visualmente con nuestro tema oscuro.
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
  hidePostalCode: true, // Chile no usa ZIP code
};

// ═══════════════════════════════════════════════════════════════════════════════
// CheckoutForm — componente interno que usa los hooks de Stripe
// Solo puede existir dentro de <Elements>, por eso está separado de CheckoutPage.
// ═══════════════════════════════════════════════════════════════════════════════
function CheckoutForm() {
  // ─── Hooks de Stripe ───────────────────────────────────────────────────────
  // useStripe() devuelve el objeto stripe con métodos como confirmCardPayment().
  // useElements() devuelve el contenedor de elementos (CardElement).
  // Ambos pueden ser null hasta que Stripe termine de cargar → siempre validar.
  const stripe = useStripe();
  const elements = useElements();

  // ─── Contextos de la app ───────────────────────────────────────────────────
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ─── Estado del formulario ─────────────────────────────────────────────────
  // Pre-llenamos el email con el del usuario autenticado (si existe).
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  // ─── Guardia: carrito vacío ────────────────────────────────────────────────
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

  // ─── handleSubmit ──────────────────────────────────────────────────────────
  // Esta función orquesta todo el flujo de pago en orden secuencial.
  // Usamos async/await para que cada paso espere al anterior.
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Si Stripe todavía está cargando, no hacemos nada
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setStripeError(null);

    // ── PASO 1: Crear PaymentIntent en el backend ───────────────────────────
    // supabase.functions.invoke() llama a nuestra Edge Function.
    // Automáticamente incluye el JWT del usuario en el header Authorization.
    // El backend recibe el monto y crea el PaymentIntent en Stripe.
    const { data, error: fnError } = await supabase.functions.invoke(
      "create-payment-intent",
      {
        body: {
          amount: totalPrice, // monto en CLP (zero-decimal, no multiplicar)
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

    // ── PASO 2: Confirmar el pago con la tarjeta ────────────────────────────
    // stripe.confirmCardPayment hace todo en una llamada:
    //   a) Toma los datos del CardElement (iframe de Stripe) y los tokeniza
    //   b) Envía el token + clientSecret directo a los servidores de Stripe
    //   c) Stripe procesa el cobro y devuelve el resultado
    //
    // Los números de tarjeta NUNCA pasan por nuestro código — eso es PCI compliance.
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
      // Stripe devuelve mensajes de error localizados (en inglés por defecto).
      // En producción podrías mapear los códigos a mensajes en español.
      setStripeError(paymentError.message ?? "Error al procesar el pago.");
      setIsProcessing(false);
      return;
    }

    // ── PASO 3: Guardar el pedido en Supabase ───────────────────────────────
    // Solo llegamos aquí si Stripe confirmó el pago (status === "succeeded").
    // Guardamos el pedido con el stripe_payment_id por si necesitamos hacer
    // un reembolso o consultar el pago en el dashboard de Stripe.
    if (paymentIntent?.status === "succeeded") {
      try {
        const order = await createOrder({
          userId: user!.id,
          total: totalPrice,
          stripePaymentId: paymentIntent.id,
          items,
        });

        // ── PASO 4: Limpiar carrito y redirigir ─────────────────────────────
        clearCart();
        // Pasamos el ID del pedido via navigation state para mostrarlo en la
        // página de confirmación. useLocation() lo lee del otro lado.
        navigate("/pedido-confirmado", {
          state: { orderId: order.id },
        });
      } catch (orderError) {
        // El pago ya se procesó pero no pudimos guardar en Supabase.
        // En producción, esto debería manejarse con webhooks de Stripe
        // para garantizar que el pedido siempre se guarde.
        console.error("Pago exitoso pero error al guardar pedido:", orderError);
      }
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="pt-16 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Título de sección */}
      <div className="mb-6 sm:mb-10">
        <p className="text-[#555] text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-2">
          Nubeo Store
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
          Checkout
        </h1>
      </div>

      {/* Layout de dos columnas: resumen | formulario */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* ── Columna izquierda: resumen del pedido ── */}
        <div className="order-2 lg:order-1">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#555] mb-4 sm:mb-6">
            Resumen del Pedido
          </h2>

          {/* Lista de items del carrito */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 sm:gap-4 border border-[#1a1a1a] p-3 sm:p-4"
              >
                {/* Imagen del producto o placeholder */}
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

                {/* Info del producto */}
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

                {/* Subtotal del item */}
                <p className="text-white text-xs sm:text-sm font-bold flex-shrink-0">
                  {formatCLP(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
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

        {/* ── Columna derecha: formulario de pago ── */}
        <div className="order-1 lg:order-2">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#555] mb-4 sm:mb-6">
            Datos de Pago
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Campo: nombre completo */}
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

            {/* Campo: email (pre-llenado con el del usuario autenticado) */}
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

            {/* Campo: tarjeta (CardElement de Stripe) */}
            {/* ─────────────────────────────────────────────────────────────── */}
            {/* CardElement es un IFRAME de Stripe. Los datos de tarjeta nunca  */}
            {/* tocan nuestro JavaScript — solo Stripe los lee. Esto es lo que  */}
            {/* hace que el checkout sea PCI-DSS compliant sin certificación.   */}
            {/* ─────────────────────────────────────────────────────────────── */}
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

              {/* Mensaje de tarjeta de prueba */}
              <p className="text-[#333] text-[10px] sm:text-xs mt-2">
                Modo test — usá: 4242 4242 4242 4242 · cualquier fecha futura ·
                cualquier CVC
              </p>
            </div>

            {/* Error de Stripe (si hubo alguno) */}
            {stripeError && (
              <div className="border border-red-900 bg-red-950/30 px-4 py-3">
                <p className="text-red-400 text-sm">{stripeError}</p>
              </div>
            )}

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={!stripe || isProcessing || items.length === 0}
              className="w-full bg-[#00D4FF] text-black font-bold py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isProcessing
                ? "Procesando..."
                : `Confirmar y Pagar ${formatCLP(totalPrice)}`}
            </button>

            {/* Indicador de seguridad */}
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

// ═══════════════════════════════════════════════════════════════════════════════
// CheckoutPage — componente público que inicializa Stripe y monta el Provider
// ═══════════════════════════════════════════════════════════════════════════════
export function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      {/*
        <Elements> es el "Provider" de Stripe. Le pasa stripePromise a todos
        sus hijos para que useStripe() y useElements() funcionen.
        Es exactamente el mismo patrón que <CartProvider> y <AuthProvider>.
      */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <Footer />
    </div>
  );
}
