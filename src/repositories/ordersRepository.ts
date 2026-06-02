// ─── ordersRepository.ts ──────────────────────────────────────────────────────
//
// Toda comunicación con las tablas `orders` y `order_items` pasa por aquí.
// Los componentes y hooks nunca llaman a Supabase directamente — esto es el
// Repository Pattern que acordamos en la arquitectura del proyecto.
//
// Si en el futuro cambiamos de Supabase a otro backend, solo cambia este archivo.

import { supabase } from "../lib/supabase";
import type { Order } from "../types/order";
import type { CartItem } from "../features/cart/CartContext";

// ─── Input para crear una orden ───────────────────────────────────────────────
// Recibimos los datos que necesitamos del componente que llama a esta función.
// No recibe el objeto `Order` completo porque el ID y created_at los genera Supabase.
interface CreateOrderInput {
  userId: string;
  total: number;
  stripePaymentId: string;
  items: CartItem[];
}

// ─── createOrder ──────────────────────────────────────────────────────────────
// Guarda el pedido en Supabase DESPUÉS de que Stripe confirmó el pago.
//
// La operación tiene dos pasos (equivalente a una transacción):
//   1. Insertar la cabecera del pedido en `orders`
//   2. Insertar cada producto en `order_items` con el ID del pedido recién creado
//
// ¿Por qué guardamos unit_price en order_items?
// Si el precio del producto cambia mañana, el pedido histórico sigue mostrando
// el precio que el cliente pagó. Esto es crítico para facturación y disputas.
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  // ─── Paso 1: insertar la cabecera del pedido ─────────────────────────────
  // .insert() + .select().single() nos devuelve el registro recién creado,
  // incluido el `id` generado por Supabase (UUID).
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: input.userId,
      total: input.total,
      status: "paid",                        // el pago ya fue confirmado por Stripe
      stripe_payment_id: input.stripePaymentId, // guardamos el ID para posibles reembolsos
    })
    .select()
    .single();

  if (orderError) {
    throw new Error(`Error al crear la orden: ${orderError.message}`);
  }

  // ─── Paso 2: insertar los items del pedido ────────────────────────────────
  // Mapeamos el carrito al formato que espera la tabla `order_items`.
  // Notar que guardamos unit_price (el precio del momento), no price de products.
  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    throw new Error(`Error al guardar los items: ${itemsError.message}`);
  }

  return order as Order;
}

// ─── getOrdersByUser ──────────────────────────────────────────────────────────
// Obtiene el historial de pedidos de un usuario, ordenados por fecha descendente.
// El `items` se obtiene via JOIN — por eso tiene `?` en la interfaz Order.
export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items (
        *,
        product:products ( name, images )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Order[];
}
