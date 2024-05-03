'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import AddressContext from '@/contexts/address';
import React, { useState, useContext, useEffect } from 'react';

const AddressPage = () => {
    const { address, setAddress } = useContext(AddressContext)

    useEffect(() => {
        const savedAddress = localStorage.getItem('address');
        if (savedAddress) {
            setAddress(JSON.parse(savedAddress));
        }
    }, []);

    const [tempaddress, settempAddress] = useState(address);
    const [editing, setEditing] = useState(false);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelClick = () => {
        setEditing(false);
    };

    const handletempChange = (e) => {
        settempAddress({ ...tempaddress, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditing(false);
        setAddress(tempaddress);
        localStorage.setItem('address', JSON.stringify(tempaddress));
    };

    return (
        <MaxWidthWrapper>
            <h1 className="text-2xl font-bold mb-4">Current Address</h1>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <p><strong>City:</strong> {address.City}</p>
                <p><strong>Country:</strong> {address.Country}</p>
                <p><strong>Zip Code:</strong> {address.ZipCode}</p>
                {!editing && (
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleEditClick}
                    >
                        Edit Address
                    </button>
                )}
            </div>
            {editing && (
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold mb-4">Edit Address</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">City</label>
                        <input
                            type="text"
                            name="City"
                            value={tempaddress.City}
                            onChange={handletempChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Country</label>
                        <input
                            type="text"
                            name="Country"
                            value={tempaddress.Country}
                            onChange={handletempChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Zip Code</label>
                        <input
                            type="text"
                            name="ZipCode"
                            value={tempaddress.ZipCode}
                            onChange={handletempChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            )}
        </MaxWidthWrapper>
    );
};

export default AddressPage;
