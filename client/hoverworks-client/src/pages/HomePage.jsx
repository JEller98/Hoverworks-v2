import LandingPage from "./LandingPage";
import Storefront from "./Storefront";
import {useRef, useState} from "react";

// this component wraps the LandingPage and StoreFront components together for React Router
export default function HomePage({cartOpen, setCartOpen}) {
    const storefrontRef = useRef(null);

    return (
        <>
            <LandingPage storefrontRef = {storefrontRef} />
            <Storefront ref = {storefrontRef} cartOpen = {cartOpen} setCartOpen = {setCartOpen}/>
        </>
    );
}