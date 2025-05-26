import { db } from "@/db";
import { verifyAccessToken } from "@/lib/auth";
import { NextRequest } from "next/server";


export async function PATCH(request: NextRequest) {
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

    if (user?.role !== "ADMIN") {
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

    // Extract productId from the request URL
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

    const { role }: { role: string } = await request.json();

    if (!role) {
        return Response.json({
            error: {
                code: "invalid_data",
                message: "Please provide user role."
            },
            success: false,
        },
            { status: 400 }
        );
    }

    try {

        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                role: role,
            },
        });

        return Response.json({
            success: true,
            message: "User Role updated Successfully.",
            user: updatedUser,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR occured while updating the user role.", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while updating the user role."
            },
            success: false,
        },
            { status: 400 }
        );
    }
}