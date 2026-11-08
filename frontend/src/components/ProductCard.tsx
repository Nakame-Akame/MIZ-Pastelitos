import type { Product } from "../types/product";
import { Link } from "react-router-dom";

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
        <Link to={`/productos/${product.id}`} aria-label={`Ver ${product.name}`}>
          <img src={product.image} alt={product.name} className="product-image" />
        </Link>
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>
          <Link to={`/productos/${product.id}`}>{product.name}</Link>
        </h3>

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