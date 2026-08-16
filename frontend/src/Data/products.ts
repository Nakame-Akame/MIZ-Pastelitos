import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Galleta MIZ",
    description: "Deliciosa galleta MIZ Pastelitos.",
    price: 3.5,
    image: "/placeholder-product.svg",
    category: "Galletas",
    featured: true,
    available: true,
  },
  {
    id: 2,
    name: "Pastelito MIZ",
    description: "Suave y delicioso pastelito.",
    price: 4.5,
    image: "/placeholder-product.svg",
    category: "Pastelitos",
    featured: true,
    available: true,
  },
  {
    id: 3,
    name: "Combo MIZ",
    description: "Una combinación especial de nuestros productos.",
    price: 10,
    image: "/placeholder-product.svg",
    category: "Combos",
    featured: true,
    available: true,
  },
  {
    id: 4,
    name: "Galletas Especiales",
    description: "Una opción especial para disfrutar.",
    price: 5,
    image: "/placeholder-product.svg",
    category: "Galletas",
    featured: false,
    available: true,
  },
];