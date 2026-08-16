import { Link, useParams } from "react-router-dom";
import { products } from "../Data/products";
import type { Product } from "../types/product";

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({
  onAddToCart,
}: ProductDetailProps) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="not-found">
        <h1>Producto no encontrado</h1>

        <Link to="/catalogo">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="product-detail">
      <div className="product-detail-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-detail-info">
        <span>{product.category}</span>

        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <strong>
          S/ {product.price.toFixed(2)}
        </strong>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
        >
          Agregar al carrito
        </button>

        <Link to="/catalogo">
          ← Volver al catálogo
        </Link>
      </div>
    </main>
  );
}