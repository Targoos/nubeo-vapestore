// ─── Supabase Edge Function: create-payment-intent ───────────────────────────
//
// Esta función corre en el BACKEND (Deno), nunca en el navegador.
// El único motivo de existir es proteger la STRIPE_SECRET_KEY:
// si la pusiera en el frontend, cualquiera que inspeccione el bundle podría robarla.
//
// Flujo:
//   1. El frontend llama a esta función con { amount, currency, items }
//   2. Aquí creamos el PaymentIntent en Stripe usando la clave secreta
//   3. Devolvemos solo el clientSecret → el frontend lo usa para confirmar el pago
//
// Deploy: supabase functions deploy create-payment-intent
// Secret: supabase secrets set STRIPE_SECRET_KEY=sk_test_...

import Stripe from "npm:stripe@17";

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Los browsers bloquean peticiones entre dominios distintos (CORS).
// Estas cabeceras le dicen al browser: "está bien, acepto llamadas desde cualquier origen".
// En producción deberías reemplazar '*' por tu dominio real (ej: 'https://nubeo.cl').
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ─── Handler principal ────────────────────────────────────────────────────────
// Deno.serve es el equivalente a app.listen() en Express.
// Recibe cada request HTTP y devuelve una Response.
Deno.serve(async (req: Request) => {
  // Los browsers hacen un request OPTIONS "preflight" antes de los POST.
  // Si no respondemos con 200 aquí, el browser bloquea la llamada real.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ─── Leer el body del request ─────────────────────────────────────────────
    // El frontend envía: { amount: 25000, currency: "clp", items: [...] }
    // amount ya viene en la unidad mínima de CLP (que ES el peso, no hay centavos)
    const { amount, currency } = await req.json();

    // Validación básica: no procesar pagos de monto cero o negativo
    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: "El monto debe ser mayor a cero" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── Inicializar el cliente de Stripe ─────────────────────────────────────
    // Deno.env.get() es el equivalente a process.env en Node.js.
    // STRIPE_SECRET_KEY se configura con: supabase secrets set STRIPE_SECRET_KEY=sk_test_...
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY no configurada en los secrets de Supabase");
    }

    const stripe = new Stripe(stripeSecretKey);

    // ─── Crear el PaymentIntent ───────────────────────────────────────────────
    // PaymentIntent = "la intención de cobrar X monto".
    // Stripe lo guarda en su sistema y le asigna un ID único (pi_xxxxx).
    //
    // IMPORTANTE sobre CLP (Peso Chileno):
    // CLP es una "zero-decimal currency" en Stripe — no tiene centavos.
    // Stripe recibe el monto tal cual: 25000 CLP = amount: 25000
    // (En cambio, para USD deberías multiplicar por 100: $25.00 = amount: 2500)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Math.round por si llega con decimales
      currency: currency ?? "clp",
      // automatic_payment_methods permite que Stripe maneje los métodos de pago
      // sin que tengas que configurar cada uno manualmente
      automatic_payment_methods: { enabled: true },
    });

    // ─── Devolver solo el clientSecret ────────────────────────────────────────
    // El clientSecret identifica este PaymentIntent específico.
    // Es seguro enviarlo al frontend: solo sirve para confirmar ESTE pago.
    // No da acceso a tu cuenta de Stripe ni puede usarse para crear otros pagos.
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
