'use client'

import React, { useState } from 'react';
import { createProduct } from '@/lib/api';
import { useFormStatus } from 'react-dom';
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: ''
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(formData);
            setMessage({ success: true, msg: 'Product created successfully.' });
            setFormData({ name: '', price: '', quantity: '' });
        } catch (error) {
            setMessage({ success: false, msg: 'Failed to create product. Please try again later.' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block mb-2">Price:</label>
                <input
                    type='text'
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block mb-2">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
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
        <button type="submit" className="mt-8 w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400" aria-disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    );
}

export default ProductForm;
