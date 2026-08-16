import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-footer">
          <strong>S/ {product.price.toFixed(2)}</strong>

          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            disabled={!product.available}
          >
            {product.available ? "Agregar" : "Agotado"}
          </button>
        </div>
      </div>
    </article>
  );
}