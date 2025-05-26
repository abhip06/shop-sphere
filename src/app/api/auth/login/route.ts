import { db } from "@/db";
import { loginValidation } from "@/validations/login.validation";
import { compare } from "bcrypt";
import { generateAccessAndRefreshTokens } from "@/lib/auth";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

// type CookieOptions = {
//     httpOnly: boolean;
//     secure: boolean;
//     sameSite: "lax";
// }

const options: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
};

export async function POST(request: Request) {
    const {
        email,
        password
    }: {
        email: string;
        password: string;
    } = await request.json();

    try {
        const validateData = loginValidation.safeParse({
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

        const existedUser = await db.user.findUnique({ where: { email: email } });

        if (!existedUser) {
            return Response.json({
                error: {
                    code: "invalid_credentials",
                    message: "Invalid email or password."
                },
                success: false,
            },
                { status: 400 }
            );
        }

        const isPasswordCorrect = await compare(validateData.data.password, existedUser.password);

        if (!isPasswordCorrect) {
            return Response.json({
                error: {
                    code: "invalid_credentials",
                    message: "Invalid email or password."
                },
                success: false,
            },
                { status: 400 }
            );
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existedUser?.id);

        cookies().set("access-token", accessToken, options);
        cookies().set("refresh-token", refreshToken, options);

        const user = await db.user.findUnique({
            where: { id: existedUser.id },
            omit: {
                password: true,
                refreshToken: true,
            },
            include: {
                address: true,
            }
        });

        return Response.json({
            success: true,
            message: "User Logged In Successfully.",
            user,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR while Sign In:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while Signing In."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}