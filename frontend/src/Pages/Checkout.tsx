import type { CartItem } from "../components/CardButton";

interface CheckoutProps {
  items: CartItem[];
}

export default function Checkout({
  items,
}: CheckoutProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <h1>No tienes productos en tu carrito</h1>
        <p>
          Agrega productos antes de realizar tu pedido.
        </p>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <section>
          <span>MIZ Pastelitos</span>

          <h1>Realizar pedido</h1>

          <form className="checkout-form">
            <label>
              Nombre completo
              <input
                type="text"
                placeholder="Tu nombre"
              />
            </label>

            <label>
              Teléfono
              <input
                type="tel"
                placeholder="999 999 999"
              />
            </label>

            <label>
              Dirección
              <input
                type="text"
                placeholder="Dirección de entrega"
              />
            </label>

            <label>
              Comentarios
              <textarea
                placeholder="Indicaciones para tu pedido"
                rows={4}
              />
            </label>

            <button type="submit">
              Confirmar pedido
            </button>
          </form>
        </section>

        <aside className="order-summary">
          <h2>Resumen</h2>

          {items.map((item) => (
            <div
              className="summary-item"
              key={item.id}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                S/{" "}
                {(item.price * item.quantity).toFixed(
                  2
                )}
              </strong>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>

            <strong>
              S/ {total.toFixed(2)}
            </strong>
          </div>
        </aside>
      </div>
    </main>
  );
}