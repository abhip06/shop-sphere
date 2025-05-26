import { db } from "@/db";
import { v2 as cloudinary } from "cloudinary";
import { verifyAccessToken } from "@/lib/auth";
import { NextRequest } from "next/server";

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ProductImages {
    id?: number;
    url?: string;
}

interface AdditionalInfoSection {
    id?: number;
    title?: string;
    description?: string;
}

interface UpdateProductData {
    title?: string;
    description?: string;
    actualPrice?: number;
    discount?: number;
    discountedPrice?: number;
    rating?: number;
    slug?: string;
    productImages?: ProductImages[];
    additionalProductInfo?: AdditionalInfoSection[];
    category?: string;
    stock?: number;
}

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
            { status: 401 }
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
            { status: 403 }
        );
    }

    // Extract productId from the request URL
    const productId = request.nextUrl.pathname.split("/").pop();

    if (!productId) {
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
        const formData = await request.formData();

        // Delete existing images that are not in the new list.
        // const existingImageIds = productImages.map(img => img.id).filter(Boolean);
        // await prisma.productImages.deleteMany({
        //     where: { productId, id: { notIn: existingImageIds } },
        // });

        const product = await db.product.update({
            where: { id: productId },
            data: {

            },
        });

        return Response.json({
            success: true,
            message: "Product updated Successfully.",
            product,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR occured while updating the product.", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while updating the product."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}