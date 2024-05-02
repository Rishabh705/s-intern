'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { loginWithCredentials } from '@/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { FaExclamationTriangle } from "react-icons/fa"
import { HiAtSymbol } from "react-icons/hi";
import { FaKey } from "react-icons/fa";

const Login = () => {
    const [message, clientAction] = useFormState(loginWithCredentials, undefined)

    return (
        <MaxWidthWrapper>
            <div className="flex flex-col py-18 items-center gap-7 ">
                <form action={clientAction} className="space-y-3 flex-1 mt-20">
                    <div className="flex-1 rounded-lg bg-gray-50 shadow-lg px-12 pb-4 pt-8 max-w-fit mx-auto">
                        <h1 className={`mb-3 text-2xl font-semibold`}>
                            Please log in to continue.
                        </h1>
                        <div className="w-full">
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                    <HiAtSymbol className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                        minLength={6}
                                    />
                                    <FaKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                        <Button />
                        {message && (
                            <div
                                className="mt-3 flex p-3 items-center justify-center space-x-5 bg-red-300 rounded-md "
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                <FaExclamationTriangle color='red' size={23} />
                                <p className="text-sm text-red-600">{message}</p>
                            </div>
                        )}
                        <div className="mt-4 text-center">
                            <Link href="/register" className="text-gray-500 hover:underline text-sm">
                                No account? Create Account
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </MaxWidthWrapper>
    )
}

function Button() {
    const { pending } = useFormStatus();

    return (
        <button className="mt-8 w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400" aria-disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    );
}

export default Login