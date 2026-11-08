import { useState } from "react";
import { Link } from "react-router-dom";
interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          MIZ <span>Pastelitos</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <Link to="/" onClick={closeMenu}>Inicio</Link>
          <Link to="/catalogo" onClick={closeMenu}>Productos</Link>
          <a href="/#nosotros" onClick={closeMenu}>Nosotros</a>
          <a href="/#contacto" onClick={closeMenu}>Contacto</a>
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
