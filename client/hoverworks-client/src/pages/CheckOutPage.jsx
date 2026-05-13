import {useState} from "react";
import {useCart} from "../context/CartContext";
import {useNavigate} from "react-router-dom";


export default function CheckOutPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const {subtotal, cartItems, clearCart} = useCart();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log("Submitted!");
        e.preventDefault();

        const order = {
            orderName: `${firstName} ${lastName[0]}.`,
            orderTotal: subtotal,
            orderStatus: "Pending"
        }

        //putting each item from the user's cart into the order_items table for the confirmation page
        try {
            //starting by logging the order in the orders table
            const orderResponse = await fetch("/orders", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(order)
            });

            if(!orderResponse.ok) {
                console.log(`Error: ${orderResponse.status}`);
                return;
            }

            //if all goes well, make a POST request for each item in the cart and fire them off all at once with Promise.all()
            const orderResult = await orderResponse.json();
            const orderID = orderResult.order.orderID;

            await Promise.all(cartItems.map(item => 
                fetch("/order-items", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        orderID: orderID,
                        prodID: item.prodID,
                        quantity: item.quantity,
                        priceAtPurchase: item.prodPrice 
                    })
                })
            ));

            //clear out the user's cart and take them to the order confirmation page
            clearCart();
            navigate("/confirmation", {state: {orderID: orderID}}); //need this to display what they bought
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            Checkout Page
            <form onSubmit = {handleSubmit}>
                <input type = "text" placeholder = "First Name..." id = "firstName" value = {firstName} onChange = {(e) => setFirstName(e.target.value)} required />
                <input type = "text" placeholder = "Last Name..." id = "lastName" value = {lastName} onChange = {(e) => setLastName(e.target.value)} required />

                {cartItems.map(item => (
                    <div key = {item.prodID}>
                        <p>{item.prodName} x{item.quantity}</p>
                        <p>{(item.prodPrice * item.quantity).toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                    </div>
                ))}
                        <p>Total: {subtotal.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                <button type = "submit" id = "submitBtn">Purchase</button>
            </form>
        </div>
    );
}