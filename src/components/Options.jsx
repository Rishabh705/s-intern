'use client'
import { deleteProduct } from "@/lib/api";
import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import DeleteContext from "@/contexts/delete";
 
export default function Options({ id, isAdmin }) {
    const { setDeleteQueue } = useContext(DeleteContext)

    const handleDelete = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await deleteProduct(id);
        location.reload()
        
        // Handle delete response as needed
    };

    const handleCheck = (e) => {
        e.stopPropagation();
        if (e.target.checked) {
            setDeleteQueue((prev) => [...prev, id]); // Add id to deleteQueue
        } else {
            setDeleteQueue((prev) => prev.filter((itemId) => itemId !== id)); // Remove id from deleteQueue
        }
    };

    return (
        <>
            {isAdmin && (
                <div className="flex gap-3 min-h-full items-center z-10 absolute right-4 top-0">
                    <span onClick={handleDelete}>
                        <FaTrashAlt color="red" size={25}/>
                    </span>
                    <input type="checkbox" name="delete" onClick={handleCheck} className="w-5 h-5" />
                </div>
            )}
        </>
    );
}
