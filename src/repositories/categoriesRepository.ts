import { supabase } from "../lib/supabase";
import type { Category, CreateCategoryInput } from "../types";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}

export async function createCategory(
  input: CreateCategoryInput,
): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .insert(input)
    .select()
    .single();

  if (error) throw error;

  return data;
}
