import { db } from "@/db";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {

    const slug = request.nextUrl.pathname.split("/").pop();

    if (!slug) {
        return Response.json({
            error: {
                code: "slug_not_found",
                message: "Please provide a slug."
            },
            success: false,
        },
            { status: 400 }
        );
    }

    try {

        const product = await db.product.findUnique({
            where: { slug: slug },
            include: {
                productImages: true,
                additionalProductInfo: true,
            },
        });

        if (!product) {
            return Response.json({
                error: {
                    code: "invalid_slug",
                    message: "Product not found."
                },
                success: false,
            },
                { status: 400 }
            );
        }

        return Response.json({
            success: true,
            message: "Product details fetched successfully.",
            product,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR occured while fetching product info:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while fetching product info."
            },
            success: false,
        },
            { status: 400 }
        );
    }
}