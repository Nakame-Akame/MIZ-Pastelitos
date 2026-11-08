import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = (products ?? []).filter(
    (product) => product.featured
  );

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            Hecho con cariño, para compartir
          </span>

          <h1>
            El sabor que <strong>te encanta</strong>
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
          <h2>Productos destacados</h2>
          <p>
            Conoce algunas de las opciones que tenemos
            para ti.
          </p>
        </div>

        <div className="products-grid">
          {isLoading
            ? [1, 2, 3].map((item) => <ProductSkeleton key={item} />)
            : featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
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