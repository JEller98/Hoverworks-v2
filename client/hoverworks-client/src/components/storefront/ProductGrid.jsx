import ProductCard from "../storefront/ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({products, setSelectedProduct}) {
    return (
        <div className = {styles.grid}>
            {products.map(product => (
                <ProductCard
                key = {product.prodID} 
                product = {product}
                setSelectedProduct = {setSelectedProduct}
                />
            ))}
        </div>
    );
}