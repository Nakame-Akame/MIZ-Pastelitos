import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import Header from "./components/Header";
import CartButton from "./components/CardButton";
import type { CartItem } from "./store/cartStore";

import Home from "./Pages/Home";
import Catalog from "./Pages/Catalogo";
import ProductDetail from "./Pages/ProductDetail";
import Checkout from "./Pages/Checkout";

import type { Product } from "./types/product";
import { useCartStore } from "./store/cartStore";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clear);

  const addToCart = (product: Product, quantity = 1) => {
    addItem(product, quantity);
    toast.success(`${product.name} agregado al carrito`);
  };

  const addCartItem = (item: CartItem) => {
    addItem(item);
    toast.success(`${item.name} agregado al carrito`);
  };

  const removeFromCart = (productId: number) => {
    const item = cartItems.find((cartItem) => cartItem.id === productId);
    if (!item) return;
    if (item.quantity > 1) {
      useCartStore.getState().setQuantity(productId, item.quantity - 1);
    } else {
      removeItem(productId);
    }
    toast("Producto actualizado", { icon: "−" });
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <div className="page-transition">
        <Routes>
        <Route
          path="/"
          element={
            <Home onAddToCart={addToCart} />
          }
        />

        <Route
          path="/catalogo"
          element={
            <Catalog onAddToCart={addToCart} />
          }
        />

        <Route
          path="/productos/:id"
          element={
            <ProductDetail
              onAddToCart={addToCart}
            />
          }
        />
        <Route
          path="/producto/:id"
          element={<ProductDetail onAddToCart={addToCart} />}
        />

        <Route
          path="/checkout"
          element={
            <Checkout items={cartItems} />
          }
        />
        </Routes>
      </div>

      {cartOpen && (
        <CartButton
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onAdd={addCartItem}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      )}
      <Toaster position="top-right" toastOptions={{ duration: 2200 }} />
    </BrowserRouter>
  );
}

export default App;