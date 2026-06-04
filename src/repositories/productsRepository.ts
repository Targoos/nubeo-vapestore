import { supabase } from "../lib/supabase";
import type {
  Product,
  ProductFilters,
  CreateProductInput,
  UpdateProductInput,
} from "../types";

export async function getProducts(
  filters: ProductFilters = {},
): Promise<Product[]> {
  let query = supabase.from("products").select("*, category:categories(*)");

  if (filters.categoryId) {
    query = query.eq("category_id", filters.categoryId);
  }

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  if (filters.onlyActive !== false) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}

export async function createProduct(
  input: CreateProductInput,
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert(input)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateProduct(
  id: string,
  input: UpdateProductInput,
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw error;
}
