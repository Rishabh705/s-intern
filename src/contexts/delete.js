'use client'

import { createContext, useState } from 'react';

const DeleteContext = createContext();

export function DeleteProvider({ children }) {


    //filtering state
    const [deleteQueue, setDeleteQueue] = useState([])

    return (
        <DeleteContext.Provider value={{ deleteQueue, setDeleteQueue }}>
            {children}
        </DeleteContext.Provider>
    );
}

export default DeleteContext;