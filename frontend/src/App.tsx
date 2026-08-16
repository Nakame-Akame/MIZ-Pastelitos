import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import CartButton, {
  type CartItem,
} from "./components/CardButton";

import Home from "./Pages/Home";
import Catalog from "./Pages/Catalogo";
import ProductDetail from "./Pages/ProductDetail";
import Checkout from "./Pages/Checkout";

import type { Product } from "./types/product";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
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
          path="/producto/:id"
          element={
            <ProductDetail
              onAddToCart={addToCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout items={cartItems} />
          }
        />
      </Routes>

      {cartOpen && (
        <CartButton
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      )}
    </BrowserRouter>
  );
}

export default App;