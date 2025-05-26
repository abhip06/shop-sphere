import { db } from "@/db";

export async function getProductById(productId: string) {
    try {
        const product = await db.product.findUnique({
            where: {id: productId},
        });

        if (!product) {
            throw new Error("Could not find product based on given Product ID.");
        }

        return product;
    } catch (error) {
        console.log("ERROR occure while fetching product info by product ID: \n", error);
        throw new Error("ERROR occure while fetching product info by product ID");
    }
}