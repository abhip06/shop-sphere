import { db } from "@/db";
import { verifyAccessToken } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

interface ProductImages {
    id: number;
    url: string;
}

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getPublicIdFromUrl(url: string): string | null {
    const lastValue = url.split("/").pop();
    const publicId = lastValue?.split(".")[0];
    if (publicId) {
        return `shopsphere/${publicId}`; // Return the public ID
    }
    return null; // if no match found
}

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
            { status: 401 }
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
        const product = await db.product.findUnique({
            where: { id: productId },
            include: {
                productImages: true,
                additionalProductInfo: true,
            }
        });

        if (!product) {
            return Response.json({
                error: {
                    code: "not_found",
                    message: "Product not found."
                },
                success: false,
            },
                { status: 400 }
            );
        }

        // Delete the associated Images from Cloudinary
        const deleteProductImageResponse = product.productImages.map((image: ProductImages) => {
            return new Promise<void>((resolve, reject) => {
                // Get the public id of the Image
                const publicId: string | null = getPublicIdFromUrl(image.url);

                if (!publicId) {
                    console.error('Could not extract public ID from URL:', image.url);
                    return Promise.resolve(); // Skip this image
                }

                cloudinary.uploader.destroy(publicId, (error, result) => {
                    if (error) {
                        console.error('Error deleting image from Cloudinary:', error);
                        reject(error);
                    } else if (result.result !== 'ok') {
                        console.error('Failed to delete image from Cloudinary:', result);
                        reject(new Error('Failed to delete image'));
                    } else {
                        resolve();
                    }
                });
            });
        });

        await Promise.all(deleteProductImageResponse);

        await db.product.delete({
            where: { id: productId },
        });

        return Response.json({
            success: true,
            message: "Product deleted Successfully",
        },
            { status: 200 }
        );
    } catch (error) {
        console.log("ERROR occured while deleting the product.", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while deleting the product."
            },
            success: false,
        },
            { status: 400 }
        );
    }
}