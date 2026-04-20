import type { Category } from "./category";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  images: string[];
  category_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export type CreateProductInput = Omit<
  Product,
  "id" | "created_at" | "updated_at" | "category"
>;
export type UpdateProductInput = Partial<CreateProductInput>;
