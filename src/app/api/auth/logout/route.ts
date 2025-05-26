import { db } from "@/db";
import { verifyAccessToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { isAuthenticated, user } = await verifyAccessToken();

        if (!isAuthenticated || !user) {
            return Response.json({
                error: {
                    code: "request_rejected",
                    message: "Unauthorize Request"
                },
                success: false
            },
                { status: 403 }
            );
        }

        await db.user.update({
            where: {
                id: user?.id,
            },
            data: {
                refreshToken: "",
            }
        });

        cookies().delete("access-token");
        cookies().delete("refresh-token");

        return Response.json({
            success: true,
            message: "User logout successfully",
        },
            { status: 200 }
        );
    } catch (error) {
        console.log("ERROR occured while Logout:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while Logout."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}