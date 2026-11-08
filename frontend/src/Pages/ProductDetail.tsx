import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../Data/products";
import type { Product } from "../types/product";
import { useProducts } from "../hooks/useProducts";

interface ProductDetailProps {
  onAddToCart: (product: Product, quantity?: number) => void;
}

export default function ProductDetail({
  onAddToCart,
}: ProductDetailProps) {
  const { id } = useParams();
  const { data: catalog, isLoading } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = (catalog ?? products).find(
    (item) => item.id === Number(id)
  );

  if (isLoading) {
    return <main className="product-detail-loading">Cargando producto...</main>;
  }

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
      <div className="product-gallery">
        <div className="product-detail-image">
        <img
          src={(product.images?.[selectedImage] ?? product.image)}
          alt={product.name}
        />
        </div>
        {(product.images?.length ?? 0) > 1 && (
          <div className="product-thumbnails">
            {product.images?.map((image, index) => (
              <button
                type="button"
                className={index === selectedImage ? "thumbnail active" : "thumbnail"}
                key={image}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} vista ${index + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-detail-info">
        <span>{product.category}</span>

        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <strong>
          S/ {product.price.toFixed(2)}
        </strong>

        <div className="detail-quantity">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
          <strong>{quantity}</strong>
          <button type="button" onClick={() => setQuantity((value) => value + 1)}>+</button>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart(product, quantity)}
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