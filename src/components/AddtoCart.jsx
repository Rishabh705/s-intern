'use client'

import { FaCartPlus } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import CartContext from "@/contexts/cart";

export default function AddToCart({ id }) {
    const [status, setStatus] = useState('');
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        // Load cart data from local storage on component mount
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []); // Run only once on component mount

    const handleAddToCart = () => {
        try {
            // Check if the product is already in the cart
            const existingProductIndex = cart.findIndex(item => item.productId === id);
            if (existingProductIndex !== -1) {
                // If the product exists, update its quantity
                const updatedCart = [...cart];
                updatedCart[existingProductIndex].boughtQuantity += 1;
                setCart(updatedCart);
                // Update local storage with the updated cart data
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            } else {
                // If the product doesn't exist, add it to the cart
                const newCart = [...cart, { productId: id, boughtQuantity: 1 }];
                setCart(newCart);
                // Update local storage with the updated cart data
                localStorage.setItem('cart', JSON.stringify(newCart));
            }
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };
    
   
    return (
        <>
            <button onClick={handleAddToCart}>
                <FaCartPlus size={25} />
            </button>
            {status === 'error' && (
                <div
                    className="mt-3 flex p-3 items-center justify-center space-x-5 bg-red-300 rounded-md"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <FaExclamationTriangle color='red' size={23} />
                    <p className="text-sm text-red-600">Add to cart failed</p>
                </div>
            )}
            {status === 'success' && (
                <div
                    className="mt-3 flex p-3 items-center justify-center space-x-5 bg-green-300 rounded-md"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <FaCheckCircle color='green' size={23} />
                    <p className="text-sm text-green-600">Added to cart successfully</p>
                </div>
            )}
        </>
    );

}
