'use client'
import React, { useContext, useState, useEffect } from 'react';
import CartContext from '@/contexts/cart';
import { createOrder, getDetail } from '@/lib/api';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import AddressContext from '@/contexts/address';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function Page() {
    const { cart, setCart } = useContext(CartContext);
    const { address } = useContext(AddressContext);

    const [products, setProducts] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');
    const [cartAmount, setCartAmount] = useState(0);

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
                            boughtQuantity: item.boughtQuantity
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

    useEffect(() => {
        // Calculate total cart amount
        let total = 0;
        products.forEach(product => {
            total += product.price * product.boughtQuantity;
        });
        setCartAmount(total);
    }, [products]);

    const handleIncreaseQuantity = (e, productId) => {
        e.stopPropagation();
        e.preventDefault()
        const updatedCart = cart.map(item => {
            if (item.productId === productId) {
                return { ...item, boughtQuantity: item.boughtQuantity + 1 };
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
            if (item.productId === productId && item.boughtQuantity > 1) {
                return { ...item, boughtQuantity: item.boughtQuantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    const handleRemoveItem = (e, productId) => {
        e.stopPropagation();
        e.preventDefault()

        const updatedCart = cart.filter(item => item.productId !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handlePlaceOrder = async () => {
        try {
            const newOrderData = {
                createdOn: new Date(),
                items: cart,
                userAddress: address,
                totalAmount: cartAmount
            };
            console.log(address);
            const res = await createOrder(newOrderData);
            if (res.ok) {
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
        <MaxWidthWrapper>
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
                                                <FaPlusCircle onClick={(e) => handleIncreaseQuantity(e, product.productId)} size={20} />
                                                {product.boughtQuantity}
                                                <FaMinusCircle onClick={(e) => handleDecreaseQuantity(e, product.productId)} size={20} />
                                                <FaTrashAlt color='red' onClick={(e) => handleRemoveItem(e, product.productId)} size={20} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center mt-4">
                        <p className="font-semibold">Total Amount: Rs. {cartAmount}</p>
                        <button onClick={handlePlaceOrder} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Place Order</button>
                    </div>
                    {orderStatus === 'success' && (
                        <p className="text-green-600 mt-2">Order placed successfully!</p>
                    )}
                    {orderStatus === 'error' && (
                        <p className="text-red-600 mt-2">Failed to place order. Please try again later.</p>
                    )}
                </>
            )}
        </MaxWidthWrapper>
    );
}
