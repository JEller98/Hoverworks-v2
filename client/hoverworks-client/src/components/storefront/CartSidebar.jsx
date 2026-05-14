import {useCart} from "../../context/CartContext";
import styles from "./CartSidebar.module.css";
import {useNavigate} from "react-router-dom";

export default function CartSidebar({cartOpen, setCartOpen}) {
    const {cartItems, subtotal, addToCart, removeFromCart, clearCart} = useCart();
    const navigate = useNavigate();
    
    return (
        <div className = {`${cartOpen ? styles.cartOverlayVisible : styles.cartOverlay}`} onClick = {() => setCartOpen(false)}>
            <div className = {`${styles.cartSidebar} ${cartOpen ? styles.cartSidebarOpen : ""}`} onClick = {(e) => e.stopPropagation()}>
                <button className = {styles.sidebarClose} onClick = {() => setCartOpen(false)}>X</button>
                <h2 className = {styles.cartHeader}>Your Cart</h2>
                <div className = {styles.itemInfo}>
                    {/* display a given item in the user's cart */}
                    {cartItems.map(item => (
                        <div key = {item.prodID}>
                            <img className = {styles.itemImg} src = {item.prodImg} alt = {item.prodName} />
                            <h3 className = {styles.itemName}>{item.prodName}</h3>
                            <p className = {styles.itemType}>Category: {item.prodType}</p>
                            <p className = {styles.itemQuantity}>Quantity: {item.quantity}</p>
                            <div className = {styles.quantityControls}>
                                <button className = {styles.quantityBtn} onClick = {() => removeFromCart(item)}>-</button>
                                <button className = {styles.quantityBtn} onClick = {() => addToCart(item)}>+</button>
                            </div>

                        </div>))}
                    <p className = {styles.cartSubtotal}>Subtotal: {subtotal.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                    <button className = {styles.checkoutBtn} onClick = {() => navigate("/checkout")}>Checkout</button>
                    <button className = {styles.clearBtn} onClick = {() => clearCart()}>Empty Cart</button>
                </div>
            </div>
        </div>
    );
}