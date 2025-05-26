"use client"

import Link from "next/link"
import { useState } from "react";

const ForgotPasswordForm = () => {

    const [loading, setLoading] = useState(false);
    const [verificationErr, setVerificationErr] = useState("");
    const [verificationMsg, setVerificationMsg] = useState("");

    return (
        <>
            <form className="flex flex-col gap-8 w-full max-w-full md:w-3/4 lg:w-1/3">
                <h1 className="text-3xl font-semibold text-violet-500 mb-5">Forgot Password</h1>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-violet-500">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your E-mail"
                        className="ring-1 ring-violet-500 rounded-md p-4"
                    // onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="bg-violet-500 text-white py-3 rounded-md disabled:bg-violet-200 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? "Sending Email..." : "Send Email"}
                </button>
            </form>
            
            {verificationErr && (
                <div className="bg-red-500 text-white px-3 py-2 rounded-md my-3">
                    {verificationErr}
                </div>
            )}

            {verificationMsg && (
                <div className="bg-green-600 text-white px-3 py-2 rounded-md my-3">
                    <p>{verificationMsg}</p>
                </div>
            )}
        </>
    )
}

export default ForgotPasswordForm