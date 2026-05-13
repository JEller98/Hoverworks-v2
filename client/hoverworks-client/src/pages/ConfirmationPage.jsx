import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";

export default function ConfirmationPage() {
    const {state} = useLocation();
    const orderID = state?.orderID;

    const [orderItems, setOrderItems] = useState([]);
    
    useEffect(() => {
        //fetch the order items when the component mounts, and anytime orderID changes (it won't)
        const fetchOrderItems = async () => {
            const response = await fetch(`/order-items/${orderID}`);
            const data = await response.json();
            setOrderItems(data.items);
        };
        fetchOrderItems();
    }, [orderID]);

    return (
        <div>
            <p className = "thankYou">Thank you for your purchase!</p>
            <p className = "disclaimer">As a reminder, no exchange has occurred. Please return when hoverboard technology has sufficiently advanced.</p>
            <h2 className = "summary">Your Order: #{orderID}</h2>
            {orderItems.map(item => (
                <div key = {item.prodID}>
                    <p className = "itemName">{item.prodName} x{item.quantity}: {item.priceAtPurchase.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                </div>
            ))}
        </div>
    );
}