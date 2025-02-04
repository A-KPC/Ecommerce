import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CartSummary from "./pages/CartSummary";
import { useState, useEffect } from "react";
import { Product } from "./types/productType";


const App = () => {

  // Initialize cart from localStorage if it exists
  const getCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage", error);
      return [];
    }

  };

  const [cart, setCart] = useState<Product[]>(getCartFromLocalStorage);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Update cart when adding/removing items
  const updateCart = (updatedCart: Product[]) => {
    setCart(updatedCart);
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home cart={cart} updateCart={updateCart} />} />
        <Route path="/product/:id" element={<ProductDetail cart={cart} updateCart={updateCart} />} />
        <Route path="/cart" element={<CartSummary cart={cart} updateCart={updateCart} />} />
      </Routes>
    </Router>
  )
}

export default App