import { db } from "@/db";
import { verifyAccessToken } from "@/lib/auth";


export async function GET(request: Request){
    // const { isAuthenticated, user } = await verifyAccessToken();

    // if (!isAuthenticated || !user) {
    //     return Response.json({
    //         error: {
    //             code: "unauthorized",
    //             message: "Please Login.",
    //         },
    //         success: false,
    //     },
    //         { status: 400 }
    //     );
    // }

    // if (user.role !== "ADMIN") {
    //     return Response.json({
    //         error: {
    //             code: "unauthorized_access",
    //             message: "You don't have permission to access the resource.",
    //         },
    //         success: false,
    //     },
    //         { status: 400 }
    //     );
    // }

    try {
        const users = await db.user.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return Response.json({
            success: true,
            message: "All users Fetched Successfully",
            users,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR while Fetching all Users:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while Fetching all Users."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}