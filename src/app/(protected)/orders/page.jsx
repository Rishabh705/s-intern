'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTrashAlt, FaPlus, FaMinus, FaEdit } from 'react-icons/fa';
import { getOrders, getDetail, deleteOrder, updateOrder } from '@/lib/api';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState();
    const [productDetails, setProductDetails] = useState({});
    const [deleteFeedback, setDeleteFeedback] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [editingOrder, setEditingOrder] = useState(null); // Track which order is being edited
    const [localOrderChanges, setLocalOrderChanges] = useState({}); // Track local changes to order items

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getOrders();
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productDetailsMap = {};
            for (const order of orders) {
                for (const item of order.items) {
                    if (!productDetailsMap[item.productId]) {
                        try {
                            const product = await getDetail(item.productId);
                            productDetailsMap[item.productId] = product;
                        } catch (error) {
                            console.error('Error fetching product details:', error);
                        }
                    }
                }
            }
            setProductDetails(productDetailsMap);
        };

        fetchProductDetails();
    }, [orders]);

    const handleDelete = async (orderId) => {
        try {
            const res = await deleteOrder(orderId);
            if (res) {
                setStatus(true);

                const ordersData = await getOrders();
                setOrders(ordersData);

                setDeleteFeedback("Order deleted successfully.");
            } else {
                setStatus(false);
                setDeleteFeedback("Failed to delete order. Please try again later.");
            }

        } catch (error) {
            console.error(error);
            setStatus(false);
            setDeleteFeedback("Failed to delete order. Please try again later.");
        }
    }

    const handleEdit = (orderId) => {
        setEditingOrder(orderId);
    }

    const handleSave = async (orderId) => {
        try {
            const newData = localOrderChanges[orderId];
            const res = await updateOrder(orderId, newData);
            if (res) {
                setStatus(true);

                const ordersData = await getOrders();
                setOrders(ordersData);

                // Handle success feedback
            } else {
                setStatus(false);
                // Handle failure feedback
            }
        } catch (error) {
            console.error(error);
            setStatus(false);
            // Handle failure feedback
        } finally {
            setEditingOrder(null); // Reset editing state after save
            setLocalOrderChanges({}); // Clear local changes
        }
    }

    const handleCancel = () => {
        setEditingOrder(null);
        setLocalOrderChanges({});
      };

      const handleQuantityChange = (orderId, productId, newQuantity, price) => {
        // Find the index of the order being edited
        const orderIndex = orders.findIndex(order => order.orderId === orderId);
        // Make a shallow copy of the orders array
        const updatedOrders = [...orders];
        // Find the index of the item being edited
        const itemIndex = updatedOrders[orderIndex].items.findIndex(item => item.productId === productId);
        // Make a shallow copy of the item
        const updatedItem = { ...updatedOrders[orderIndex].items[itemIndex] };
        // Update the quantity of the item
        updatedItem.boughtQuantity = newQuantity;
        updatedItem.amount = newQuantity * price;
        
        // Update the item in the shallow copy of the orders array
        updatedOrders[orderIndex].items[itemIndex] = updatedItem;
    
        // Recalculate total amount for the order
        let totalAmount = 0;
        updatedOrders[orderIndex].items.forEach(item => {
            totalAmount += item.amount;
        });
        updatedOrders[orderIndex].totalAmount = totalAmount;
    
        // Update the localOrderChanges state with the updated orders array
        setLocalOrderChanges({
            ...localOrderChanges,
            [orderId]: updatedOrders[orderIndex]
        });
    }
    
    return (
        <MaxWidthWrapper>
            <h1 className='mt-3 text-2xl font-semibold'>My Orders</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className={cn('flex flex-col gap-y-6', "py-6")}>
                    {orders.map((order, index) => (
                        <Card key={order.orderId}>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">Order #{index + 1}</CardTitle>
                            </CardHeader>
                            <CardContent className='flex justify-between items-end'>
                                <div>
                                    <CardDescription className="text-gray-500">Total Amount: Rs. {order.totalAmount}</CardDescription>
                                    <CardDescription className="text-gray-500">Order Date: {new Date(order.createdOn).toLocaleDateString()}</CardDescription>
                                    <CardDescription className="text-gray-500">Address: {order.userAddress.City}, {order.userAddress.Country}, {order.userAddress.ZipCode}</CardDescription>
                                    <div className="mt-2">
                                        {order.items.map((item, idx) => {
                                            const product = productDetails[item.productId];
                                            return product ? (
                                                <div key={idx}>
                                                    <div>
                                                        <Link href={`/${item.productId}`}>Name of item: {product.name}</Link>
                                                        {editingOrder === order.orderId ? (
                                                            <p className="flex items-center gap-4">
                                                                <button onClick={() => handleQuantityChange(order.orderId, item.productId, item.boughtQuantity - 1, product.price)} disabled={item.boughtQuantity === 1}>
                                                                    <FaMinus />
                                                                </button>
                                                                {item.boughtQuantity}
                                                                <button onClick={() => handleQuantityChange(order.orderId, item.productId, item.boughtQuantity + 1, product.price)}>
                                                                    <FaPlus />
                                                                </button>
                                                                x Rs. {product.price} = Rs. {(item.boughtQuantity * product.price).toFixed(2)}
                                                            </p>
                                                        ) : (
                                                            <p>{item.boughtQuantity} x Rs. {product.price} = Rs. {(item.boughtQuantity * product.price).toFixed(2)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    {editingOrder === order.orderId ? (
                                        <>
                                            <span className='hover:cursor-pointer' onClick={() => handleSave(order.orderId)}>
                                                Save
                                            </span>
                                            <span className='hover:cursor-pointer' onClick={handleCancel}>
                                                Cancel
                                            </span>
                                        </>
                                    ) : (
                                        <span className='hover:cursor-pointer' onClick={() => handleEdit(order.orderId)}>
                                            <FaEdit color='green' size={25} />
                                        </span>
                                    )}
                                    <span onClick={() => handleDelete(order.orderId)} className='hover:cursor-pointer'>
                                        <FaTrashAlt color='red' size={25} />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {status !== undefined && (
                <div className={`mt-4 text-sm ${status ? 'text-green-600' : 'text-red-600'}`}>
                    {deleteFeedback}
                </div>
            )}
        </MaxWidthWrapper>
    );
}
