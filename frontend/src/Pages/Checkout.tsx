import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CartItem } from "../store/cartStore";
import { useCartStore } from "../store/cartStore";
import type { Order } from "../types/order";

const checkoutSchema = z.object({
  name: z.string().min(2, "Escribe tu nombre completo"),
  phone: z.string().min(7, "Ingresa un teléfono válido"),
  deliveryMethod: z.enum(["delivery", "pickup"]),
  address: z.string().optional(),
}).superRefine((values, context) => {
  if (values.deliveryMethod === "delivery" && !values.address?.trim()) {
    context.addIssue({ code: "custom", path: ["address"], message: "Indica una dirección de entrega" });
  }
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

interface CheckoutProps {
  items: CartItem[];
}

export default function Checkout({
  items,
}: CheckoutProps) {
  const clearCart = useCartStore((state) => state.clear);
  const [order, setOrder] = useState<Order | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { deliveryMethod: "delivery" },
  });
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (order) {
    return (
      <main className="checkout-page confirmation-page">
        <span className="confirmation-mark" aria-hidden="true">✓</span>
        <h1>Pedido confirmado</h1>
        <p>Gracias, {order.customerName}. Recibimos tu pedido y pronto nos pondremos en contacto contigo.</p>
        <strong className="order-number">Pedido #{order.id}</strong>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <h1>No tienes productos en tu carrito</h1>
        <p>Agrega productos antes de realizar tu pedido.</p>
      </main>
    );
  }

  const deliveryMethod = watch("deliveryMethod");
  const onSubmit = (values: CheckoutValues) => {
    const nextOrder: Order = {
      id: `MIZ-${Date.now().toString().slice(-6)}`,
      customerName: values.name,
      phone: values.phone,
      address: values.address,
      deliveryMethod: values.deliveryMethod,
      items,
      total,
      createdAt: new Date().toISOString(),
    };
    setOrder(nextOrder);
    clearCart();
  };

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <section>
          <span>MIZ Pastelitos</span>

          <h1>Realizar pedido</h1>

          <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              Nombre completo
              <input
                type="text"
                placeholder="Tu nombre"
                {...register("name")}
              />
              {errors.name && <small className="form-error">{errors.name.message}</small>}
            </label>

            <label>
              Teléfono
              <input
                type="tel"
                placeholder="999 999 999"
                {...register("phone")}
              />
              {errors.phone && <small className="form-error">{errors.phone.message}</small>}
            </label>

            <label>
              Método de entrega
              <select {...register("deliveryMethod")}>
                <option value="delivery">Delivery</option>
                <option value="pickup">Recojo en tienda</option>
              </select>
            </label>

            {deliveryMethod === "delivery" && (
              <label>
                Dirección
                <input type="text" placeholder="Dirección de entrega" {...register("address")} />
                {errors.address && <small className="form-error">{errors.address.message}</small>}
              </label>
            )}

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