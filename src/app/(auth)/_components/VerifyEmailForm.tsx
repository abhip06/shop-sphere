"use client"

import Link from 'next/link';
import { useRef, useState } from 'react'

const VerifyEmailForm = ({ verificationId }: { verificationId: string }) => {
    const [verificationErr, setVerificationErr] = useState("");
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inactiveBtn, setInactiveBtn] = useState<boolean>(true);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]); // Ref array for inputs

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        // Move to the next input if a digit is entered
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
        if (index === inputRefs.current.length - 1) setInactiveBtn(false);
    };

    return (
        <>
            <form className="flex flex-col gap-8 w-full max-w-full md:w-3/4 lg:w-1/3">
                <h1 className="text-3xl font-semibold text-violet-500">Verify Email</h1>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-violet-500">Enter the Code that you have recieved</label>
                    {/* <input
                        type="text"
                        name="code"
                        placeholder="Enter Code"
                        className="ring-1 ring-violet-500 rounded-md p-4 outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                    /> */}
                    <div className="grid grid-cols-6 gap-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                name={`code-${index}`}
                                className="ring-2 ring-violet-500 rounded-md p-3 outline-none text-center text-xl text-gray-500 font-semibold"
                                maxLength={1} // Restrict input to one character
                                onChange={(e) => handleChange(e, index)} // Handle change
                                ref={(el) => {
                                    inputRefs.current[index] = el; // Assign the ref without returning it
                                }}
                            />
                        ))}
                    </div>
                </div>
                <button
                    className="bg-violet-500 text-white py-3 rounded-md disabled:bg-violet-200 disabled:cursor-not-allowed"
                    disabled={loading || inactiveBtn}
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>
            </form>
            <div className="mt-5">
                Didn&apos;t receive the code?{" "}
                <Link
                    href="/verify"
                    className="text-blue-500 font-medium"
                >
                    Resend Email
                </Link>
            </div>

            {verificationErr && (
                <div className="bg-red-500 text-white px-3 py-2 rounded-md my-3">
                    {verificationErr}
                </div>
            )}

            {verificationSuccess && (
                <div className="bg-green-600 text-white px-3 py-2 rounded-md my-3">
                    <p>
                        Verification Success. Now you can{" "}
                        <Link href="/login">Log in. Redirecting to login page...</Link>
                    </p>
                </div>
            )}

        </>
    )
}

export default VerifyEmailForm