import {useState} from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import {CartProvider} from "./context/CartContext";
import CartSidebar from "./components/storefront/CartSidebar";
import {Routes, Route} from "react-router-dom";
import CheckOutPage from "./pages/CheckOutPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div>
      <CartProvider>
        <Routes>
          <Route path = "/" element = {<HomePage cartOpen = {cartOpen} setCartOpen = {setCartOpen}/> } />
          <Route path = "/checkout" element = {<CheckOutPage />} />
          <Route path = "/confirmation" element = {<ConfirmationPage />} />
        </Routes>
        <CartSidebar cartOpen = {cartOpen} setCartOpen = {setCartOpen}/>
      </CartProvider>
    </div>
  );
}

export default App;