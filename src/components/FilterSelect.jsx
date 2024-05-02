'use client'
import React, { useContext } from "react";
import FilterContext from "@/contexts/filter";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function FilterSelect() {
    const { filter, setFilter } = useContext(FilterContext);

    const handleChange = (value) => {
        let min, max;
        // Parsing selected value to get min and max
        if (value === "0-50") {
            min = 0;
            max = 50;
        } else if (value === "51-100") {
            min = 51;
            max = 100;
        } else if (value === "101+") {
            min = 101;
            max = 10000; // Assuming 10000 is the upper limit
        } else {
            // Handle default case
            min = 0;
            max = 10000;
        }

        // Update filter state
        setFilter({ min, max });
    };

    return (
        <Select onValueChange={(value) => handleChange(value)} value={`${filter.min}-${filter.max}`}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose Price range" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="0-50">0-50</SelectItem>
                <SelectItem value="51-100">51-100</SelectItem>
                <SelectItem value="101+">101+</SelectItem>
            </SelectContent>
        </Select>
    );
}
