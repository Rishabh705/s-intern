'use client'

import DeleteContext from "@/contexts/delete"
import { useContext } from "react"
import { deleteProduct } from "@/lib/api"
import { Button } from "./ui/button"

export default function MuliDele() {
    const { deleteQueue, setDeleteQueue } = useContext(DeleteContext)
    const handleDelete = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Iterate over selected item ids and delete each item
        deleteQueue.forEach(async (itemId) => {
            await deleteProduct(itemId);
        });

        // Clear selected items after deletion
        setDeleteQueue([]);
        
        location.reload()

    };
    return (
        <Button variant='destructive' onClick={handleDelete}>Delete</Button>
    )
}
