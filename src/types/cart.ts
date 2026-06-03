export interface CartItem {
  id: string;
  name: string;
  brand: string | null;
  price: number;
  quantity: number;
  image: string | null;
}
