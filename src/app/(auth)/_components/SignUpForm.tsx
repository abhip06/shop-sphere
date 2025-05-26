"use client"

import { signUpValidation } from "@/validations/signUp.validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"
import { z } from "zod";

import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";
import BtnLoader from "@/components/BtnLoader";

const SignUpForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [validationIssue, setValidationIssue] = useState<z.ZodFormattedError<
        z.infer<typeof signUpValidation>,
        string
    > | null>(null);

    const route = useRouter();

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setValidationIssue(null);

        const formData = new FormData(e.currentTarget);

        const fullName = formData.get("fullName");
        const email = formData.get("email");
        const password = formData.get("password");

        try {

            const validateData = signUpValidation.safeParse({
                fullName,
                email,
                password,
            });

            if (!validateData.success) {
                setValidationIssue(validateData.error.format());
                return;
            }

            const response = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(validateData.data),
            });

            const response_data = await response.json();

            if (response.status === 500) {
                toast.error("Something went wrong. Try again later.");
                return;
            }

            if (!response.ok) {
                toast.error(response_data?.error?.message);
                return;
            }

            if (response.status === 201) {
                toast.success(response_data?.message);
                route.push("sign-in");
            }

        } catch (error) {
            toast.error("Something went wrong. Try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className="text-3xl font-semibold text-violet-500 mb-5">Sign Up</h1>

            <div className="w-full max-w-full md:w-3/4 lg:w-1/3">
                <Link
                    href={loading ? `#` : "/api/auth/google"}
                    className="px-6 py-2 flex items-center justify-center rounded-md mt-5 border-violet-500 border-2 hover:scale-105 transition-all ease-in-out duration-75"
                >
                    <span className="mr-2">
                        <FcGoogle className="w-8 h-8" />
                    </span>
                    Sign up with Google
                </Link>

                <Link
                    href={loading ? `#` : "/api/auth/github"}
                    className="px-6 py-2 flex items-center justify-center rounded-md mt-5 border-violet-500 border-2 hover:scale-105 transition-all ease-in-out duration-75"
                >
                    <span className="mr-2">
                        <FaGithub className="w-8 h-8" />
                    </span>
                    Sign up with GitHub
                </Link>
            </div>

            <div className="mt-7 mb-4 w-full md:w-3/4 lg:w-1/3 flex items-center justify-center">
                <div className="before-or w-[100%] h-[2px] bg-gray-300 mr-2"></div>
                <p className="text-gray-500 or">OR</p>
                <div className="after-or w-[100%] h-[2px] bg-gray-300 ml-2"></div>
            </div>

            <form onSubmit={handleSignUp} className="flex flex-col gap-8 w-full max-w-full md:w-3/4 lg:w-1/3">
                <div className="flex flex-col gap-2">
                    <label className={`text-sm ${validationIssue?.fullName ? "text-red-500" : "text-violet-500"}`}>Full Name</label>
                    {validationIssue?.fullName && (
                        <div className="flex flex-col gap-3">
                            {validationIssue?.fullName?._errors?.map((err, index) => (
                                <p
                                    key={index}
                                    className="text-red-500 text-sm"
                                >
                                    {err}
                                </p>
                            ))}
                        </div>
                    )}
                    <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Enter your Full Name"
                        className={`relative ring-1 rounded-md p-4 outline-none ${validationIssue?.fullName ? "ring-red-500" : "ring-violet-500"}`}
                    />
                </div>


                <div className="flex flex-col gap-2">
                    <label className={`text-sm ${validationIssue?.email ? "text-red-500" : "text-violet-500"}`}>E-mail</label>
                    {validationIssue?.email && (
                        <div className="flex flex-col gap-">
                            {validationIssue?.email?._errors?.map((err, index) => (
                                <p
                                    key={index}
                                    className="text-red-500 text-sm"
                                >
                                    {err}
                                </p>
                            ))}
                        </div>
                    )}
                    <input
                        type="email"
                        name="email"
                        autoComplete="username"
                        required
                        placeholder="Enter your E-mail"
                        className={`relative ring-1 rounded-md p-4 outline-none ${validationIssue?.email ? "ring-red-500" : "ring-violet-500"}`}
                    />
                </div>


                <div className="flex flex-col gap-2">
                    <label className={`text-sm ${validationIssue?.password ? "text-red-500" : "text-violet-500"}`}>Password</label>
                    {validationIssue?.password && (
                        <div className="flex flex-col gap-4">
                            {validationIssue?.password?._errors?.map((err, idx) => (
                                <p
                                    key={idx}
                                    className="text-red-500 text-sm"
                                >
                                    {err}
                                </p>
                            ))}
                        </div>
                    )}
                    <div
                        className={`relative ring-1 rounded-md p-1 ${validationIssue?.password ? "ring-red-500" : "ring-violet-500"}`}
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            placeholder="Set your password"
                            className="p-3 w-full outline-none"
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
                <button
                    className="bg-violet-500 text-white py-3 rounded-md disabled:bg-violet-200 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex justify-center items-center gap-4">
                            <BtnLoader />
                            Signing up ...
                        </div>
                    ) : "Sign Up"}
                </button>
            </form>

            <p className="text-center my-5">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-blue-700 underline">
                    Sign in
                </Link>
            </p>
        </>
    )
}

export default SignUpForm