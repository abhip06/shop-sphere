"use client"

import Link from 'next/link';
import { useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu';

const SetNewPassword = () => {
    const [verificationErr, setVerificationErr] = useState("");
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col items-center justify-center">
            <form className="flex flex-col gap-8 w-full max-w-full md:w-3/4 lg:w-1/3">
                <h1 className="text-3xl font-semibold text-violet-500 mb-5">Set new Password</h1>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-violet-500">Set Password</label>
                    <div
                        className="relative ring-1 ring-violet-500 rounded-md p-1"
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Set password"
                            className="p-3 w-full outline-none"
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={() => setShowPassword((prev) => !prev)}
                            type="button"
                            aria-label="Password Invisible."
                        >
                            {showPassword ? (
                                <LuEye className="w-6 h-6 absolute top-4 right-2 select-none text-gray-700 cursor-pointer" />
                            ) : (
                                <LuEyeOff className="w-6 h-6 absolute top-4 right-2 select-none text-gray-700 cursor-pointer" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-violet-500">Confirm Password</label>
                    <div
                        className="relative ring-1 ring-violet-500 rounded-md p-1"
                    >
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="password"
                            placeholder="Re-enter password"
                            className="p-3 w-full outline-none"
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            type="button"
                            aria-label="Password Invisible."
                        >
                            {showConfirmPassword ? (
                                <LuEye className="w-6 h-6 absolute top-4 right-2 select-none text-gray-700 cursor-pointer" />
                            ) : (
                                <LuEyeOff className="w-6 h-6 absolute top-4 right-2 select-none text-gray-700 cursor-pointer" />
                            )}
                        </button>
                    </div>
                </div>
                <button
                    className="bg-violet-500 text-white py-3 rounded-md disabled:bg-violet-200 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? "Resetting password..." : "Reset"}
                </button>
            </form>
            {verificationErr && (
                <div className="bg-red-500 text-white px-3 py-2 rounded-md my-3">
                    {verificationErr}
                </div>
            )}

            {verificationSuccess && (
                <div className="bg-green-600 text-white px-3 py-2 rounded-md my-3">
                    <p>
                        Password Reset Success. Now you can{" "}
                        <Link href="/login">Log in. Redirecting to login page...</Link>
                    </p>
                </div>
            )}
        </div>
    )
}

export default SetNewPassword