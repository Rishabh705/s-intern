'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTrashAlt } from 'react-icons/fa';
import { getOrders, getDetail, deleteOrder } from '@/lib/api';
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
                                                <div key={idx} className="flex items-center justify-between">
                                                    <div>
                                                        <Link href={`/${item.productId}`}>Name of item: {product.name}</Link>
                                                        <p>{item.boughtQuantity} x Rs. {product.price} = Rs. {(item.boughtQuantity * product.price).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                                <span onClick={() => handleDelete(order.orderId)} className='hover:cursor-pointer'>
                                    <FaTrashAlt color='red' size={25} />
                                </span>
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
