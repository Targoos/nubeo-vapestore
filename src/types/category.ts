
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export type CreateCategoryInput = Omit<Category, "id" | "created_at">;
