import { db } from "@/db";
import { generateUsername } from "@/lib/utils";
import { NextRequest } from "next/server";
import { signUpValidation, usernameValidation } from "@/validations/signUp.validation";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
    const {
        fullName,
        email,
        password

    }: {
        fullName: string;
        email: string;
        password: string;
    } = await request.json();

    console.log(fullName + " " + email + " " + password);

    try {

        const validateData = signUpValidation.safeParse({
            fullName,
            email,
            password
        });

        if (!validateData.success) {
            return Response.json({
                error: {
                    code: "validation_error",
                    message: validateData.error.format()
                },
                success: false,
            },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({ where: { email: email } });
        console.log(existingUser);

        if (existingUser) {
            return Response.json({
                error: {
                    code: "user_exists",
                    message: "You already have an account. Please Login."
                },
                success: false,
            },
                { status: 409 }
            );
        }

        const username: string = generateUsername(email);

        const validateUsername = usernameValidation.safeParse(username);

        if (!validateUsername.success) {
            return Response.json({
                error: {
                    code: "username_validation_error",
                    message: validateUsername.error.format()
                },
                success: false,
            },
                { status: 400 }
            );
        }

        const hashedPassword = await hash(validateData.data.password, 10);

        const newUser = await db.user.create({
            data: {
                fullName: validateData.data.fullName,
                email: validateData.data.email,
                username: validateUsername.data,
                password: hashedPassword
            },
            omit: {
                password: true,
                refreshToken: true,
            }
        });

        return Response.json({
            success: true,
            message: "You have Successfully Registered. Please Login.",
            user: newUser,
        },
            { status: 201 }
        );

    } catch (error) {
        console.log("ERROR while Sign Up:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while Signing Up."
            },
            success: false,
        },
            { status: 500 }
        );
    }
} 