import { db } from "@/db";
import { verifyAccessToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    try {
        const { isAuthenticated, user } = await verifyAccessToken();

        if (!isAuthenticated || !user) {
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

        const orderId: string | undefined = request.nextUrl.pathname.split("/").pop();

        if (!orderId) {
            return Response.json({
                error: {
                    code: "not_fount",
                    message: "Please provide Order Id.",
                },
                success: false,
            },
                { status: 400 }
            );
        }

        const order = await db.order.findUnique({
            where: { id: orderId },
            include: {
                customer: {
                    omit: {
                        password: true,
                        refreshToken: true,
                    },
                },
                OrderItem: {
                    include:{
                        product: {
                            select: {
                                title: true,
                            }
                        },
                    }
                },
                shippingAddress: true,
            }
        });

        if (!order) {
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
            message: "Order Info Fetched Successfully",
            order,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR while Fetching the Order info:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while Fetching the Order info."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}