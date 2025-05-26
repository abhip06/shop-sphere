import { z } from "zod";

export const usernameValidation = z
    .string({required_error: "Username is required"})
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username should not more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username should not contain special characters");

export const signUpValidation = z.object({
    fullName: z
        .string({ required_error: "Name is required" })
        .min(1, { message: "Name is required" })
        .max(50, { message: "Name should be less than 40 characters" })
        .regex(/^[a-zA-Z\s]+$/, {
            message: "Name should contain only alphabets.",
        }),
    email: z.string({ required_error: "Email is required" }).email({
        message: "Email address not valid",
    }),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, {
            message: "Password should have at least 8 characters",
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
            message:
                "Password must contain a lowercase letter, uppercase letter, number, and symbol",
        }),
});