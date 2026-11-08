export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  featured: boolean;
  available: boolean;
}