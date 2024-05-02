'use client'

import { createContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {


    //filtering state
    const [filter, setFilter] = useState({
        min: 0,
        max: 10000
    })

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
}

export default FilterContext;