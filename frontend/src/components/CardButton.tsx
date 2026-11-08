import { Link } from "react-router-dom";
import type { CartItem } from "../store/cartStore";

interface CartButtonProps {
  items: CartItem[];
  onClose: () => void;
  onAdd: (item: CartItem) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
}

export default function CartButton({
  items,
  onClose,
  onAdd,
  onRemove,
  onClear,
}: CartButtonProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <div>
            <span>Tu compra</span>
            <h2>Carrito</h2>
          </div>

          <button type="button" className="close-cart" onClick={onClose}>
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h3>Tu carrito está vacío</h3>

            <p>Agrega algunos productos de MIZ Pastelitos para comenzar.</p>

            <button type="button" className="continue-button" onClick={onClose}>
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    <span>S/ {item.price.toFixed(2)}</span>

                    <div className="quantity-controls">
                      <button type="button" onClick={() => onRemove(item.id)}>
                        −
                      </button>

                      <strong>{item.quantity}</strong>

                      <button type="button" onClick={() => onAdd(item)}>
                        +
                      </button>
                    </div>
                  </div>

                  <strong className="item-total">
                    S/ {(item.price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Productos</span>
                <strong>{totalItems}</strong>
              </div>

              <div>
                <span>Total</span>
                <strong>S/ {total.toFixed(2)}</strong>
              </div>

              <Link
                to="/checkout"
                className="checkout-button"
                onClick={onClose}
              >
                Continuar con el pedido
              </Link>

              <button type="button" className="clear-button" onClick={onClear}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
