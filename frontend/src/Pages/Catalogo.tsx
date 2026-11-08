import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import type { Product } from "../types/product";
import { useProducts } from "../hooks/useProducts";

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

export default function Catalog({ onAddToCart }: CatalogProps) {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data: products = [], isLoading } = useProducts();

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 300);
    return () => window.clearTimeout(timeout);
  }, [search]);

  const categories = [
    "Todos",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    category === "Todos"
      ? products
      : products.filter(
          (product) => product.category === category
        );

  const visibleProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch),
  );

  return (
    <main className="catalog-page">
      <section className="catalog-header">
        <span>MIZ Pastelitos</span>
        <h1>Nuestros productos</h1>
        <p>
          Descubre todos nuestros productos y
          encuentra tu favorito.
        </p>
        <label className="catalog-search">
          <span>Buscar productos</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Busca tu favorito"
          />
        </label>
      </section>

      <section className="catalog-content">
        <div className="category-filter">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {isLoading ? [1, 2, 3, 4].map((item) => <ProductSkeleton key={item} />) : visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
        {!isLoading && visibleProducts.length === 0 && (
          <div className="empty-results">
            <span aria-hidden="true">⌕</span>
            <h2>No encontramos productos</h2>
            <p>Prueba con otro nombre o categoría.</p>
          </div>
        )}
      </section>
    </main>
  );
}