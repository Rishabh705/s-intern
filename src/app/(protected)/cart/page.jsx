'use client'
import React, { useContext, useState, useEffect } from 'react';
import CartContext from '@/contexts/cart';
import { getDetail } from '@/lib/api';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

export default function Page() {
    const { cart, setCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');

    useEffect(() => {
        // Load cart data from local storage on component mount
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productDetails = await Promise.all(
                    cart.map(async (item) => {
                        const productData = await getDetail(item.productId);
                        return {
                            ...productData,
                            quantity: item.quantity
                        };
                    })
                );
                setProducts(productDetails);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProducts();
    }, [cart]);

    const handleIncreaseQuantity = (e, productId) => {
        e.stopPropagation();
        e.preventDefault()
        const updatedCart = cart.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    const handleDecreaseQuantity = (e, productId) => {
        e.stopPropagation();
        e.preventDefault()

        const updatedCart = cart.map(item => {
            if (item.productId === productId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    const handleRemoveItem = (productId) => {
        const updatedCart = cart.filter(item => item.productId !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handlePlaceOrder = async () => {
        try {
            const newOrderData = {
                createdOn: new Date(),
                items: cart,
                userAddress: userAddress,
                totalAmount: cartAmount
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cart),
            });
            if (response.ok) {
                setOrderStatus('success');
                // Clear the cart after successful order placement
                setCart([]);
                localStorage.removeItem('cart');
            } else {
                setOrderStatus('error');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setOrderStatus('error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {products.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200">
                        {products.map((product, index) => (
                            <Link href={`/${product.productId}`} key={index}>
                                <li className="py-2">
                                    <Card className='shadow-md hover:shadow-lg'>
                                        <CardContent className="flex h-full justify-between p-4 relative">
                                            <div className="space-y-2">
                                                <CardTitle>{product.name}</CardTitle>
                                                <CardDescription>Rs. {product.price}</CardDescription>
                                            </div>
                                            <div className='flex gap-2 min-h-full items-center absolute top-0 right-4 z-10'>
                                                <FaPlusCircle onClick={() => handleIncreaseQuantity(product.productId)} />
                                                {product.quantity}
                                                <FaMinusCircle onClick={() => handleDecreaseQuantity(product.productId)} />
                                                <FaTrashAlt color='red' onClick={() => handleRemoveItem(product.productId)} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <button onClick={handlePlaceOrder} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">Place Order</button>
                    {orderStatus === 'success' && (
                        <p className="text-green-600 mt-2">Order placed successfully!</p>
                    )}
                    {orderStatus === 'error' && (
                        <p className="text-red-600 mt-2">Failed to place order. Please try again later.</p>
                    )}
                </>
            )}
        </div>
    );
}
