'use client'

import { postProduct } from '@/lib/actions'
import { getDetail, updateProduct } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { FaExclamationTriangle } from "react-icons/fa"
import { FaCheckCircle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const UpdateForm = ({ params }) => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        quantity: ""
    })
    const [status, setStatus] = useState('')

    const handleChange = (evt) => {
        setFormData(prev => {
            return {
                ...prev,
                [evt.target.name]: evt.target.value
            }
        })
    }

    useEffect(() => {
        async function loadRecord() {
            try {
                const data = await getDetail(params.id)
                console.log(data);
                setFormData(prev => {
                    return {
                        ...prev,
                        name: data.name,
                        price: data.price,
                        quantity: data.quantity
                    }
                })

            } catch (err) {
                console.log(err)
            }
        }
        loadRecord()
    }, [params.id])

    function change() {
        router.push("/admin")
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updateProduct(params.id, formData)
            setStatus('success')
            setTimeout(change, 700)
        } catch (e) {
            setStatus('error')
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 px-2 ">
            <h1 className='text-2xl font-semibold mb-12 text-center'>Update Form</h1>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block mb-2">Price:</label>
                <input
                    type='text'
                    id="price"
                    name="price"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block mb-2">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.quantity}
                    onChange={handleChange}
                />
            </div>
            <Button />
            {status === 'error' && (
                <div
                    className="mt-3 flex p-3 items-center justify-center space-x-5 bg-red-300 rounded-md "
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <FaExclamationTriangle color='red' size={23} />
                    <p className="text-sm text-red-600">Updation Failed</p>
                </div>
            )}
            {status === 'success' && (
                <div
                    className="mt-3 flex p-3 items-center justify-center space-x-5 bg-green-300 rounded-md "
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <FaCheckCircle color='green' size={23} />
                    <p className="text-sm text-green-600">Updated Successfully</p>
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
export default UpdateForm;
