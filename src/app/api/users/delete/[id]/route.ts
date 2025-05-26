import { db } from "@/db";
import { verifyAccessToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
    const { isAuthenticated, user } = await verifyAccessToken();

    if (!isAuthenticated || !user) {
        return Response.json({
            error: {
                code: "unauthorized",
                message: "Please Login.",
            },
            success: false,
        },
            { status: 400 }
        );
    }

    if (user.role !== "ADMIN") {
        return Response.json({
            error: {
                code: "unauthorized_access",
                message: "You don't have permission to access the resource.",
            },
            success: false,
        },
            { status: 400 }
        );
    }

    const userId = request.nextUrl.pathname.split("/").pop();

    if (!userId) {
        return Response.json({
            error: {
                code: "not_found",
                message: "Please Provide Product Id."
            },
            success: false,
        },
            { status: 400 }
        );
    }

    try {
        const users = await db.user.delete({
            where: { id: userId },
        });

        return Response.json({
            success: true,
            message: "User Deleted Successfully.",
            users,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR while Deleting User:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while Deleting User."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}