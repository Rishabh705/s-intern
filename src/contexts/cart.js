'use client'

import { createContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {


    //filtering state
    const [cart, setCart] = useState([])

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;