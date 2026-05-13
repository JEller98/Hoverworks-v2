import {useCart} from "../../context/CartContext";
import styles from "./CartSidebar.module.css";
import {useNavigate} from "react-router-dom";

export default function CartSidebar({cartOpen, setCartOpen}) {
    const {cartItems, subtotal, removeFromCart, clearCart} = useCart();
    const navigate = useNavigate();
    
    return (
        <div className = {styles.cartOverlay} onClick = {() => setCartOpen(false)}>
            <div className = {`${cartOpen ? styles.cartSidebar : styles.cartSidebarHidden}`} onClick = {(e) => e.stopPropagation()}>
                <button className = {styles.sidebarClose} onClick = {() => setCartOpen(false)}>X</button>
                <h2 className = {styles.cartHeader}>Your Cart</h2>
                <div className = {styles.itemInfo}>
                    {/* display a given item in the user's cart */}
                    {cartItems.map(item => (
                        <div key = {item.prodID}>
                            {/* <img className = {styles.itemImg} src = {item.prodImg} alt = {item.prodName} /> */}
                            <h3 className = {styles.itemName}>{item.prodName}</h3>
                            <p className = {styles.itemType}>{item.prodType}</p>
                            <p className = {styles.itemQuantity}>{item.quantity}</p>
                            <p className = {styles.itemPrice}>{item.prodPrice.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                            <p className = {styles.itemDesc}>{item.prodDesc}</p>
                            {/* <p className = {styles.itemSpecs}>{item.prodSpecs}</p> */}
                            <button className = {styles.removeBtn} onClick = {() => removeFromCart(item)}>Remove From Cart</button>

                        </div>))}
                    <p className = {styles.cartSubtotal}>{subtotal.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                    <button className = {styles.checkoutBtn} onClick = {() => navigate("/checkout")}>Checkout</button>
                    <button className = {styles.clearBtn} onClick = {() => clearCart()}>Empty Cart</button>
                </div>
            </div>
        </div>
    );
}