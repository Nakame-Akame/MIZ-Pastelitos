import { products } from "../Data/products";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            MIZ Pastelitos
          </span>

          <h1>
            El sabor que
            <br />
            te encanta
          </h1>

          <p>
            Descubre nuestros deliciosos productos
            y disfruta el sabor de MIZ Pastelitos.
          </p>

          <a href="#productos" className="hero-button">
            Ver productos
          </a>
        </div>
      </section>

      <section id="productos" className="products-section">
        <div className="section-heading">
          <span>Descubre nuestros productos</span>
          <h2>Productos destacados</h2>
          <p>
            Conoce algunas de las opciones que tenemos
            para ti.
          </p>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      <section className="about-section">
        <div>
          <span>MIZ Pastelitos</span>

          <h2>
            Un sabor para cada momento
          </h2>

          <p>
            Estamos preparando una experiencia sencilla
            para que puedas conocer nuestros productos,
            realizar tus pedidos y disfrutar de MIZ
            Pastelitos.
          </p>
        </div>
      </section>
    </main>
  );
}