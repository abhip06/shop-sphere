import { db } from "@/db";

export async function GET(request: Request) {
    try {
        const categories = await db.product.findMany({
            select: {
                category: true,
                productImages: {
                    take: 1,    // Get at least one image for each category
                    select: { url: true },
                },
            },
            distinct: ['category'],
        });

        if (!categories) {
            return Response.json({
                error: {
                    code: "not_found",
                    message: "No Categories found."
                },
                success: false,
            },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "All unique Categories fetched successfully.",
            categories,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR while fetching All unique Categories:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while fetching All unique Categories."
            },
            success: false,
        },
            { status: 500 }
        );
    }

}