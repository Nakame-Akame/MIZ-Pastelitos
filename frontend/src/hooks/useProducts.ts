import { useQuery } from "@tanstack/react-query";
import { products } from "../Data/products";

const fetchProducts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/api/products`);
    if (!response.ok) throw new Error("No se pudo cargar el catálogo");
    return (await response.json()) as typeof products;
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return products;
  }
};

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });
}
