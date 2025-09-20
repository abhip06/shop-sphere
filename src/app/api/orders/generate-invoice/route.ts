

export async function GET(request: Request) {
    try {
        return Response.json({
            success: true,
            message: "Currently in testing phase.",
        },
            { status: 200 }
        );
    } catch (error) {
        return Response.json({
            success: true,
            message: "Something went wrong",
            error
        },
            { status: 500 }
        );
    }
}