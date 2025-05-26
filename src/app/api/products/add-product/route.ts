import { db } from "@/db";
// import { ProductType } from "@/types/types";
import { v2 as cloudinary } from "cloudinary";
import { additionalProductInfoValidation, addProductValidation } from "@/validations/addProduct.validation";
import { verifyAccessToken } from "@/lib/auth";

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {

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

    const formData = await request.formData();

    try {
        // Extract files
        const files = formData.getAll("productImages") as File[];

        if (!Array.isArray(files) || files.length === 0) {
            throw new Error('No files uploaded');
        }

        // Extract other fields
        const title = formData.get("title")?.toString() || "";
        const description = formData.get("description")?.toString() || "";
        const actualPrice = Number(formData.get("actualPrice")) || 0;
        const discountedPrice = Number(formData.get("discountedPrice")) || 0;
        const discount = parseInt(formData.get("discount")?.toString() || "0", 10);
        const rating = Number(formData.get("rating")) || 0;
        const slug = formData.get("slug")?.toString() || "";
        const stock = parseInt(formData.get("stock")?.toString() || "0", 10);
        const category = formData.get("category")?.toString() || "";
        const additionalProductInfo = JSON.parse(formData.get("additionalProductInfo") as string);

        const validateData = addProductValidation.safeParse({
            title,
            description,
            actualPrice,
            discountedPrice,
            discount,
            rating,
            slug,
            stock,
            category,
        });

        if (!validateData.success) {
            return Response.json({
                error: {
                    code: "validation_error",
                    message: validateData.error.format()
                },
                success: false,
            },
                { status: 400 }
            );
        }

        const additionalProductValidateData = additionalProductInfoValidation.safeParse(additionalProductInfo);

        if (!additionalProductValidateData.success) {
            return Response.json({
                error: {
                    code: "additional_validation_error",
                    message: additionalProductValidateData.error.format()
                },
                success: false,
            },
                { status: 400 }
            );
        }

        // Handle multiple file uploads to Cloudinary
        const uploadPromises = files.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);

            return new Promise<string>((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    folder: "shopsphere"
                },
                    function (error, result) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        if (result && result.secure_url) {
                            resolve(result.secure_url);
                        } else {
                            reject(new Error('Upload failed, no secure_url returned'));
                        }
                    }).end(buffer);
            });
        });

        const imageUrls = await Promise.all(uploadPromises);


        const product = await db.product.create({
            data: {
                title: validateData.data.title,
                description: validateData.data.description,
                actualPrice: validateData.data.actualPrice,
                discountedPrice: validateData.data.discountedPrice,
                discount: validateData.data.discount,
                stock: validateData.data.stock,
                slug: validateData.data.slug,
                rating: validateData.data.rating,
                category: validateData.data.category,
                productImages: {
                    create: imageUrls.map((imgUrl) => ({
                        url: imgUrl,
                    })),
                },
                additionalProductInfo: {
                    create: additionalProductValidateData.data.map((info) => ({
                        title: info.title,
                        description: info.description,
                    })),
                }
            },
            include: {
                productImages: true,
                additionalProductInfo: true,
            }
        });

        return Response.json({
            success: true,
            message: "Product Added Successfully.",
            product,
        },
            { status: 201 }
        );

    } catch (error) {
        console.log("ERROR while adding a new Product:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while adding a new Product."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}
