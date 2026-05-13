import styles from "./ProductCard.module.css";

export default function ProductCard({product, setSelectedProduct}) {
    console.log(product);
    return (
        <button className = {styles.card} onClick = {() => setSelectedProduct(product)}>
            <img className = {styles.imageArea} src = {product.prodImg} alt = {product.prodName}/>
            <div className = {styles.cardFooter}>
                <h2 className = {styles.cardName}>{product.prodName}</h2>
                <p className = {styles.cardPrice}>{product.prodPrice.toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
                {/* <img className = {styles.cardIcon} src = {`/icons/${product.prodType}.svg`} alt = {product.prodType}/> */}
            </div>
        </button>
    );
}