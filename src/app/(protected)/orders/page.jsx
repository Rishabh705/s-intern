'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { getOrders, getProductwithId } from '@/lib/api';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState(new Map());

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getOrders();
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const populateCart = () => {
            const newCart = new Map();
            orders.forEach(order => {
                const id = order.productId.toString();
                newCart.set(id, (newCart.get(id) || 0) + 1);
            });
            setCart(newCart);
        };

        populateCart();
    }, [orders]);

    const cards = Array.from(cart.entries()).map(async ([productId, numberOfItems]) => {
        try {
            const product = await getProductwithId(productId);
            return (
                <Link href={`/${productId}`} key={productId}>
                    <Card className='shadow-md hover:shadow-lg'>
                        <CardContent className="flex justify-between p-4">
                            <div className='space-y-4 h-full'>
                                <CardTitle>{product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name}</CardTitle>
                                <CardDescription>Rs. {product.price}</CardDescription>
                            </div>
                            <div className='flex gap-2 min-h-full items-center'>
                                <FaPlusCircle />
                                {numberOfItems}
                                <FaMinusCircle />
                                <FaTrashAlt color='red' />
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            );
        } catch (error) {
            console.error('Error fetching product details:', error);
            return null;
        }
    });

    return (
        <MaxWidthWrapper>
            <h1 className='mt-3 text-2xl font-semibold'>My Orders</h1>
            <div className={cn('flex flex-col gap-y-6', "py-6")}>
                {cards}
            </div>
        </MaxWidthWrapper>
    );
}
