import type { CartItem } from "../store/cartStore";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address?: string;
  deliveryMethod: "delivery" | "pickup";
  items: CartItem[];
  total: number;
  createdAt: string;
}