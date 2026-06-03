import { supabase } from "../lib/supabase";
import type { Order } from "../types/order";
import type { CartItem } from "../types/cart";

interface CreateOrderInput {
  userId: string;
  total: number;
  stripePaymentId: string;
  items: CartItem[];
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: input.userId,
      total: input.total,
      status: "paid",
      stripe_payment_id: input.stripePaymentId,
    })
    .select()
    .single();

  if (orderError) {
    throw new Error(`Error al crear la orden: ${orderError.message}`);
  }

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

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      items:order_items (
        *,
        product:products ( name, images )
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Order[];
}
