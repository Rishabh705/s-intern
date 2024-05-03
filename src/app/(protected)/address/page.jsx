'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
            <Card className='my-8'>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-4">Current Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription><strong>City:</strong> {address.City}</CardDescription>
                    <CardDescription><strong>Country:</strong> {address.Country}</CardDescription>
                    <CardDescription><strong>Zip Code:</strong> {address.ZipCode}</CardDescription>
                    {!editing && (
                        <button
                            className="mt-4 bg-primary text-accent px-4 py-2 rounded-md hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={handleEditClick}
                        >
                            Edit Address
                        </button>
                    )}
                </CardContent>
            </Card>
            {editing && (
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold mb-4">Edit Address</CardTitle>
                        </CardHeader>
                        <CardContent>

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
                                    className="mr-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2"
                                    onClick={handleCancelClick}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary text-accent px-4 py-2 rounded-md focus:outline-none focus:ring-2"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            )}
        </MaxWidthWrapper>
    );
};

export default AddressPage;
