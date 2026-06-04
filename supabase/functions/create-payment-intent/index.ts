import Stripe from "npm:stripe@17";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface CartItem {
  id: string;
  quantity: number;
}

interface ProductRow {
  id: string;
  price: number;
  stock: number;
  is_active: boolean;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { items, currency } = await req.json();

    // Validación básica del body
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Se requiere al menos un producto en el carrito" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    for (const item of items as CartItem[]) {
      if (!item.id || typeof item.quantity !== "number" || item.quantity < 1) {
        return new Response(
          JSON.stringify({ error: "Cada item debe tener un id y quantity >= 1" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    // SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY son inyectadas automáticamente
    // por Supabase en todas las Edge Functions — no hace falta configurarlas a mano.
    // Usamos la service role key para saltear el RLS y leer precios con autoridad de servidor.
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Variables de entorno de Supabase no disponibles");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const productIds = (items as CartItem[]).map((item) => item.id);

    const { data: products, error: dbError } = await supabase
      .from("products")
      .select("id, price, stock, is_active")
      .in("id", productIds);

    if (dbError) {
      throw new Error(`Error consultando la base de datos: ${dbError.message}`);
    }

    // Si la DB devuelve menos productos de los pedidos, algún id no existe
    if (!products || products.length !== productIds.length) {
      return new Response(
        JSON.stringify({ error: "Uno o más productos no existen" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Calcular el total real ignorando completamente el precio que vino del cliente
    let totalAmount = 0;

    for (const item of items as CartItem[]) {
      const product = (products as ProductRow[]).find((p) => p.id === item.id);

      // Este caso no debería ocurrir dado el check anterior, pero TypeScript lo requiere
      if (!product) {
        return new Response(
          JSON.stringify({ error: `Producto ${item.id} no encontrado` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      if (!product.is_active) {
        return new Response(
          JSON.stringify({ error: `El producto ${item.id} no está disponible` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      if (product.stock < item.quantity) {
        return new Response(
          JSON.stringify({ error: `Stock insuficiente para el producto ${item.id}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      totalAmount += product.price * item.quantity;
    }

    if (totalAmount <= 0) {
      return new Response(
        JSON.stringify({ error: "El monto calculado debe ser mayor a cero" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY no configurada en los secrets de Supabase");
    }

    const stripe = new Stripe(stripeSecretKey);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount), // CLP no tiene decimales, pero Math.round protege ante floats
      currency: currency ?? "clp",
      automatic_payment_methods: { enabled: true },
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
