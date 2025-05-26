import { db } from "@/db";
import { verifyAccessToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {

    try {
        const { isAuthenticated, user } = await verifyAccessToken();

        if (!isAuthenticated || !user || (user.role !== "ADMIN")) {
            return Response.json({
                error: {
                    code: "unauthorized",
                    message: "You don't have permissions to access the resource.",
                },
                success: false,
            },
                { status: 400 }
            );
        }

        const orderId: string | undefined = request.nextUrl.pathname?.split("/")?.pop();

        if (!orderId) {
            return Response.json({
                error: {
                    code: "not_found",
                    message: "Please provide the Order ID."
                },
                success: false,
            },
                { status: 400 }
            );
        }

        const result = await db.order.delete({
            where: { id: orderId },
        });

        if (!result) {
            return Response.json({
                error: {
                    code: "invalid_order_id",
                    message: "No Order found based on given Order ID."
                },
                success: false,
            },
                { status: 400 }
            );
        }

        return Response.json({
            success: true,
            message: "Order Deleted Successfully.",
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR while Deleting an Order:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while Deleting an Order."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}