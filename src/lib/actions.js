'use server'

import { signIn, signOut } from "./auth";
import connect from "./db";
import User from "@/Models/Users";
import Product from "@/Models/Products";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation'
import { auth } from "./auth";
import { revalidatePath } from "next/cache";
import { z } from 'zod'
import { Types } from "mongoose";

export async function loginWithCredentials(prevState, formData) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        console.log("msg: ", error.message);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                case "CallbackRouteError":
                    return 'User not found.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function registerWithCredentials(prevState, formData) {
    try {
        const schema = z.object({
            email: z.string().min(2, {
                message: "Email must be valid.",
            }),
            password1: z.string().min(6, {
                message: "Password Length should be more than 6.",
            }),
            password2: z.string().min(6, {
                message: "Password Length should be more than 6.",
            }),
        });

        // Parse and validate the formData against the schema
        const parsedCredentials = schema.safeParse(Object.fromEntries(formData));

        // Check if parsing was successful
        if (!parsedCredentials.success) {
            throw new Error(parsedCredentials.error.errors[0].message);
        }

        const { email, password1, password2 } = parsedCredentials.data;

        if (password1 !== password2) {
            throw new Error("Passwords do not match.");
        }
        //find if user exists
        await connect()
        const user = await User.findOne({ email: email })

        //if user exists, return error
        if (user) {
            throw new Error("Email already exists")
        }
        const hashedPassword = await bcrypt.hash(password1, 10)

        //if user does not exist, create user
        const newUser = new User({ email: email, password: hashedPassword })

        //save user
        await newUser.save()

    } catch (err) {
        console.log("tyty: ", err.message)
        return err.message
    }
    redirect('/login')
}

export async function logout() {
    await signOut();
}

export async function addToCart(id) {
    try {
        await connect()

        const { user } = await auth()

        const loggedUser = await User.findOneAndUpdate({ email: user.email }, { $push: { orders: id } }, { new: true });

        if (!loggedUser) {
            return {
                success: false,
                msg: "User not found!"
            };
        }

        const product = await Product.findOneAndUpdate(
            { _id: id, quantity: { $gt: 0 } }, // Ensure quantity is greater than 0
            { $inc: { quantity: -1 } }, // Decrement quantity by 1
            { new: true }
        );

        if (!product) {
            return {
                success: false,
                msg: "Product not found or quantity is insufficient!"
            };
        }

        revalidatePath(`/${id}`)

        return {
            success: true,
            msg: "Added to cart successfully!"
        };
    } catch (err) {
        console.error(err.message);
        return {
            success: false,
            msg: "Something went wrong!"
        };
    }
}

export async function getOrders() {
    try {
        await connect()
        const { user } = await auth()
        const foundUser = await User.findOne({ email: user.email })

        return {
            success: true,
            orders: foundUser.orders,
            results: foundUser.orders.length
        }

    } catch (err) {
        return {
            success: false,
            error: err.message
        }
    }
}

export async function getProductwithId(id) {
    try {
        await connect();
        const product = await Product.findOne(new Types.ObjectId(id)); 
        
        if(!product) throw new Error("No such product with the given id present.");

        return product;
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
}

export async function postProduct(prevState, formData){
    try {
        await connect()

        const newProduct = new Product({
            name: formData.get('name'),
            price: formData.get('price'),
            quantity: formData.get('quantity'),
        });

        await newProduct.save()

        revalidatePath('/admin')

        return {
            success: true,
            msg: "Product created successfully!"
        }

    } catch (err) {
        console.log(err.message);
        return {
            success: false,
            msg: "Something went wrong!"
        }
    }
}

