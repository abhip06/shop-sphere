import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { db } from "@/db";
import { cookies } from "next/headers";

export async function generateAccessAndRefreshTokens(userId: string) {
    try {
        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("Invalid UserID. Could'nt generate Access and Refresh Token.");

        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username,
            },
            process.env.ACCESS_TOKEN_SECRET as Secret,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        const refreshToken = jwt.sign(
            {
                id: user.id,
            },
            process.env.REFRESH_TOKEN_SECRET as Secret,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: refreshToken,
            }
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log("ERROR: While generating Access and Refresh Token \n", error);
        throw new Error("Failed to generate Access and Refresh Token,");
    }
};

export async function verifyAccessToken() {
    try {
        const token = cookies().get("access-token")?.value;
        if (!token) return { isAuthenticated: false, user: null };

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret) as JwtPayload;

        const authUser = await db.user.findUnique({
            where: { id: decodedToken?.id },
            omit: {
                password: true,
            }
        });

        if (!authUser) return { isAuthenticated: false, user: null };

        return { isAuthenticated: true, user: authUser };
    } catch (error) {
        console.log("ERROR: While Checking the user is Authenticated or not.");
        throw new Error("Error occured while Checking the user is Authenticated or not.");
    }
}

export async function refreshAccessToken(incommingRefreshToken: string) {
    try {
        if (!incommingRefreshToken) {
            throw new Error("Unauthorized Request.");
        }

        const decodedToken = jwt.verify(
            incommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET as Secret
        ) as JwtPayload;

        const user = await db.user.findUnique({
            where: { id: decodedToken?.id },
            omit: {
                password: true,
            }
        });

        if (!user) {
            throw new Error("Invalid Refresh Token.");
        }

        if (incommingRefreshToken !== user?.refreshToken) {
            throw new Error("Refresh Token already expired.");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(decodedToken?.id);

        return { accessToken, refreshToken };
    } catch (error) {
        console.log("ERROR: While Refreshing Access token.\n", error);
        throw new Error("Error occured while refreshing Access Token.");
    }
}