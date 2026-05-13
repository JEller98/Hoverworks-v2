import {createContext, useContext, useState} from "react";

//this lets you drill down to anywhere in the dependency tree
//instead of manually passing stuff down file to file
const CartContext = createContext();

export function CartProvider({children}) {
    //store items in cart as objects, get info from JSON properties
    const [cartItems, setCartItems] = useState([]);

    const subtotal = cartItems.reduce((total, item) =>
        total + (item.prodPrice * item.quantity), 0);

    const addToCart = (product) => {
        const existingIndex = cartItems.findIndex(item => item.prodID === product.prodID);

        if (existingIndex !== -1) {
            //item already exists, find its index in the JSON and add to its quantity
            setCartItems(cartItems.map((item, index) => index === existingIndex ? {...item, quantity: item.quantity + 1} : item));
        }
        else {
            //item doesn't exist, add it to the cart
            setCartItems([...cartItems, {...product, quantity: 1}]);
        }
    }

    const removeFromCart = (product) => {
        const existingIndex = cartItems.findIndex(item => item.prodID === product.prodID);
        if (product.quantity > 1) {
            setCartItems(cartItems.map((item, index) => index === existingIndex ? {...item, quantity: item.quantity - 1}: item));
        }
        else {
            setCartItems(cartItems.filter(item => (item.prodID !== product.prodID)));
        }
    }

    const clearCart = () => setCartItems([]);

    return (
        // make sure all the functions are available anywhere in the children
        <CartContext.Provider value = {{cartItems, subtotal, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
export default CartContext;