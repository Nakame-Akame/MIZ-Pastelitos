import { useState } from "react";
import { products } from "../Data/products";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

export default function Catalog({ onAddToCart }: CatalogProps) {
  const [category, setCategory] = useState("Todos");

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

  return (
    <main className="catalog-page">
      <section className="catalog-header">
        <span>MIZ Pastelitos</span>
        <h1>Nuestros productos</h1>
        <p>
          Descubre todos nuestros productos y
          encuentra tu favorito.
        </p>
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
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </main>
  );
}