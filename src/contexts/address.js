'use client'

import { createContext, useState } from 'react';

const AddressContext = createContext();

export function AddressProvider({ children }) {


    const [address, setAddress] = useState({
        City: 'Your City',
        Country: 'Your Country',
        ZipCode: 'Your Zip Code'
    })

    return (
        <AddressContext.Provider value={{ address, setAddress }}>
            {children}
        </AddressContext.Provider>
    );
}

export default AddressContext;