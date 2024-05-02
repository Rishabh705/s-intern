'use client'

import { postProduct } from '@/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { FaExclamationTriangle } from "react-icons/fa"
import { FaCheckCircle } from 'react-icons/fa'
const ProductForm = () => {
    const [message, clientAction] = useFormState(postProduct, undefined)

    return (
        <form action={clientAction} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block mb-2">Price:</label>
                <input
                    type='text'
                    id="price"
                    name="price"
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block mb-2">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <Button />
            {message && !message.success && (
                <div
                    className="mt-3 flex p-3 items-center justify-center space-x-5 bg-red-300 rounded-md "
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <FaExclamationTriangle color='red' size={23} />
                    <p className="text-sm text-red-600">{message.msg}</p>
                </div>
            )}
            {message && message.success && (
                <div
                    className="mt-3 flex p-3 items-center justify-center space-x-5 bg-green-300 rounded-md "
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <FaCheckCircle color='green' size={23} />
                    <p className="text-sm text-green-600">{message.msg}</p>
                </div>
            )}
        </form>
    );
};
function Button() {
    const { pending } = useFormStatus();

    return (
        <button className="mt-8 w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400" aria-disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    );
}
export default ProductForm;
