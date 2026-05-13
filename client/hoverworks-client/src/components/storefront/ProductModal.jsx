import {useCart} from "../../context/CartContext";

export default function ProductModal({product, onClose}) {
    //pull the function out of the larger context that's been imported
    const {addToCart} = useCart();
    
    return (
        <div className = "modal">
            <div className = "modal-overlay" onClick = {onClose}>

            </div>
            <div className = "modal-content" onClick = {(e) => e.stopPropagation()}>
                <button className = "modal-close" onClick = {onClose}>X</button>
                {/* <img className = "product-img" src = {product.prodImg} alt = {product.prodName} /> */}
                <h2 className = "product-name">{product.prodName}</h2>
                <p className = "product-type">{product.prodType}</p>
                <p className = "product-price">{product.prodPrice.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                <p className = "product-desc">{product.prodDesc}</p>
                {/* <p className = "product-specs">{product.prodSpecs}</p> */}
                <button className = "add-btn" onClick = {() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
}