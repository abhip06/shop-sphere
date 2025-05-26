import { db } from "@/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const productId = request.nextUrl.pathname.split("/").pop();

    if (!productId) {
        return Response.json({
            error: {
                code: "id_not_found",
                message: "Please provide a Product ID."
            },
            success: false,
        },
            { status: 400 }
        );
    }

    try {
        const product = await db.product.findUnique({
            where: { id: productId },
            include: {
                productImages: true,
            },
        });

        if (!product) {
            return Response.json({
                error: {
                    code: "invalid_id",
                    message: "Product not found."
                },
                success: false,
            },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "Product info fetched successfully.",
            product,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR while fetching product info:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while fetching product info."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}