//this file powers the carousel on the "Storefront" page. 
import {useState, useEffect, useRef} from "react";
import styles from "./RecentPurchases.module.css";

export default function RecentPurchases({setSelectedProduct, products}) {
    const [purchases, setPurchases] = useState([]);
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({left: -220, behavior: "smooth"});
    }
    const scrollRight = () => {
        carouselRef.current.scrollBy({left: 220, behavior: "smooth"});
    }

    //get the recent purchases from the endpoint
    useEffect(() => {
        const fetchPurchases = async () => {
            const response = await fetch("/orders/recent");
            const data = await response.json();

            setPurchases(data.purchases);
        }
        fetchPurchases();
    }, []);

    return (
    <section className = {styles.section}>
        <h2 className = {styles.sectionHeader}>These items have been trending with galesurfers:</h2>
        <div className = {styles.carouselWrapper}>
            <button className = {styles.arrowLeft} onClick = {scrollLeft}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>
            <div className = {styles.carouselContainer} ref = {carouselRef}>
                {purchases.map(item => (
                        <button key = {item.orderID} className = {styles.carouselItem} onClick = {() => setSelectedProduct(products.find(p => p.prodID === item.prodID))}>
                            <div className = {styles.imgPlaceholder}>
                                {item.prodName}
                            </div>
                        </button>
                ))}
            </div>
            <button className = {styles.arrowRight} onClick = {scrollRight}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>
        </div>
    </section>
    );
}