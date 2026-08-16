import { Link } from "react-router-dom";
interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          MIZ <span>Pastelitos</span>
        </Link>

        <nav className="nav">
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Productos</Link>
          <a href="/#nosotros">Nosotros</a>
          <a href="/#contacto">Contacto</a>
        </nav>

        <button className="cart-button" onClick={onCartClick} type="button">
          🛒
          <span>Carrito</span>
          {cartCount > 0 && <strong className="cart-count">{cartCount}</strong>}
        </button>
      </div>
    </header>
  );
}
