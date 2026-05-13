import {useState, useEffect} from "react";
import ProductCard from "../components/storefront/ProductCard";
import ProductGrid from "../components/storefront/ProductGrid";
import ProductModal from "../components/storefront/ProductModal";
import FilterBar from "../components/storefront/FilterBar";
import {useCart} from "../context/CartContext";
import RecentPurchases from "../components/storefront/RecentPurchases";

export default function Storefront({ref: storefrontRef, cartOpen, setCartOpen}) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeFilters, setActiveFilters] = useState([]);
    const {cartItems} = useCart();
    const [products, setProducts] = useState([]);

    //fetch products from DB
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/items");
            const data = await response.json();
            console.log(data);
            setProducts(data.prods);
        };
        fetchProducts();
    }, []);

    //filter logic
    const filteredProducts = activeFilters.length === 0
    ? products : products.filter(product => activeFilters.includes(product.prodType));

    const toggleFilter = (type) => {
        if(activeFilters.includes(type)) {
            //remove a filter
            setActiveFilters(activeFilters.filter(f => f !== type))
        }
        else {
            //add a filter
            setActiveFilters([...activeFilters, type]);
        }
    }

    const totalQuantity = cartItems.reduce((total, item) => {
        total += item.quantity;
        return total;
    }, 0)
    const clearFilters = () => setActiveFilters([]);
    return (
        <section ref = {storefrontRef} className = "storefront">
            <button className = "cartBtn" onClick = {() => setCartOpen(true)}>Cart {totalQuantity}</button>
            {/* above the grid for DOM targeting reasons */}
            <FilterBar 
                activeFilters = {activeFilters}
                toggleFilter = {toggleFilter}
                clearFilters = {clearFilters}
            />
            
            <ProductGrid
                products = {filteredProducts}
                setSelectedProduct = {setSelectedProduct}
            />

            {/* conditional rendering */}
            {selectedProduct && <ProductModal
                product = {selectedProduct}
                onClose = {() => setSelectedProduct(null)}
            />}

            <RecentPurchases
                products = {products}
                setSelectedProduct = {setSelectedProduct}
            />
        </section>
    );
}