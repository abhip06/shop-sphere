import { db } from "@/db";
import { verifyAccessToken } from "@/lib/auth";

export async function GET(request: Request) {

    try {
        const { isAuthenticated, user } = await verifyAccessToken();

        if (!isAuthenticated || !user) {
            return Response.json({
                error: {
                    code: "unauthorized",
                    message: "Please Login.",
                },
                success: false,
            },
                { status: 401 }
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
                { status: 403 }
            );
        }

        const orders = await db.order.findMany({
            include: {
                OrderItem: {
                    include: {
                        product: {
                            select: {
                                title: true,
                                productImages: {
                                    take: 1,
                                    select: { url: true }
                                }
                            }
                        }
                    }
                },
                customer: {
                    select: {
                        fullName: true,
                        email: true,
                    },
                },
                shippingAddress: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return Response.json({
            success: true,
            message: "All orders Fetched Successfully",
            orders,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR while Fetching all Orders:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while Fetching all Orders."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}