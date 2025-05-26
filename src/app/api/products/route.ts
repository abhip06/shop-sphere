import { db } from "@/db";


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
    
        const type = searchParams.get('type');
        const min = searchParams.get('min');
        const max = searchParams.get('max');
        const category = searchParams.get('category');
        const sort = searchParams.get('sort');
        const limit = searchParams.get('limit');
        const search = searchParams.get('search');
    
        // Fetch all products from the database
        let products = await db.product.findMany({
            include: {
                productImages: true,
                additionalProductInfo: true,
            },
        });

        if (!products) {
            return Response.json({
                error: {
                    code: "not_found",
                    message: "No Product found."
                },
                success: false,
            },
                { status: 400 }
            );
        }
    
        // Apply filters
        // if (type) products = products.filter((p) => p.type === type);
        if (category) products = products.filter((p) => p.category === category);
        if (min) products = products.filter((p) => p.discountedPrice >= parseFloat(min));
        if (max) products = products.filter((p) => p.discountedPrice <= parseFloat(max));
           
        // Apply search
        if (search) {
            const searchTerm = search.toLowerCase();
            products = products.filter((p) =>
                p.title.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.category.toLowerCase().includes(searchTerm)
            );
        }
    
        // Apply sorting
        if (sort) {
            const [order, key] = sort.split(' '); // Expecting format 'asc price' or 'desc price'
            products = products.sort((a, b) => {
                if (key === 'price') {
                    return order === 'asc' ? a.actualPrice - b.actualPrice : b.actualPrice - a.actualPrice;
                }
                if (key === 'lastUpdated') {
                    return order === 'asc'
                        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
                        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                }
                return 0;
            });
        }

        // Apply Limit to products
        if (limit) products = products.slice(0, parseInt(limit));
    
        return Response.json({
            success: true,
            message: "Product filtered and fetched successfully",
            products,
        },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error occured while filtering the products.");
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while filtering the products."
            },
            success: false,
        },
            { status: 400 }
        );
    }
}