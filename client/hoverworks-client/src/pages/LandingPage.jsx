import {useState} from "react";
import styles from "./LandingPage.module.css";
import useRandomBackground from "../hooks/useRandomBackgrounds";

export default function LandingPage({storefrontRef}) {
    const [isOpen, setIsOpen] = useState(false);

    const background = useRandomBackground();

    return (
        <main className = {`${styles.hero} ${isOpen ? styles.heroHidden : ""}`} style = {{backgroundColor: background}}>
                <h1 className = {styles.logo}>Hoverworks</h1>
                <button className = {styles.arrow} 
                onClick = {() => {setIsOpen(true)}}>
                    <svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <polyline points="4 18 24 6 44 18"/>
                    </svg>
                </button>
        </main>
    );
}