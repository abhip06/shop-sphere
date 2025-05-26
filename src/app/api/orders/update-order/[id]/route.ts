import { db } from "@/db";
import { verifyAccessToken } from "@/lib/auth";
import { orderValidation } from "@/validations/createOrder.validation";
import { NextRequest } from "next/server";

interface OrderItemType {
    id?: number;
    productId: string;
    quantity: number;
    price: number;
}

interface IncomingUpdateOrderData {
    subTotal: number;
    taxPrice: number;
    deliveryCharges: number;
    totalPrice: number;
    quantity: number;
    addressId: number;
    customerId: string;
    products: OrderItemType[];
    paymentStatus: "UNPAID" | "PAID";
    orderStatus: string;
}


export async function PATCH(request: NextRequest) {

    try {

        const { isAuthenticated, user } = await verifyAccessToken();

        if (!isAuthenticated || !user || (user.role !== "ADMIN")) {
            return Response.json({
                error: {
                    code: "unauthorized",
                    message: "You don't have permissions to access the resource.",
                },
                success: false,
            },
                { status: 400 }
            );
        }

        const orderId: string | undefined = request.nextUrl.pathname?.split("/")?.pop();

        if (!orderId) {
            return Response.json({
                error: {
                    code: "order_id_not_found",
                    message: "Please provide the Order ID."
                },
                success: false,
            },
                { status: 400 }
            );
        }
        const {
            subTotal,
            taxPrice,
            deliveryCharges,
            totalPrice,
            quantity,
            addressId,
            customerId,
            products,
            paymentStatus,
            orderStatus
        }: IncomingUpdateOrderData = await request.json();

        const validateData = orderValidation.safeParse({
            subTotal,
            taxPrice,
            deliveryCharges,
            totalPrice,
            quantity,
            addressId,
            customerId,
            products,
            paymentStatus
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


        const order = await db.order.update({
            where: { id: orderId },
            data: {
                subTotal: validateData.data.subTotal,
                taxPrice: validateData.data.taxPrice,
                deliveryCharges: validateData.data.deliveryCharges,
                totalPrice: validateData.data.totalPrice,
                quantity: validateData.data.quantity,
                addressId: validateData.data.addressId,
                customerId: validateData.data.customerId,
                OrderItem: {
                    create: products.map((product: OrderItemType) => ({
                        product: {
                            connect: {
                                id: product.productId, // Use `connect` to link the product by its ID
                            },
                        },
                        quantity: product.quantity,
                        price: product.price
                    })),
                },
                paymentStatus: validateData.data.paymentStatus,
            },
            include: {
                OrderItem: true,
                customer: {
                    omit: {
                        password: true,
                        refreshToken: true,
                        role: true,
                        isEmailVerified: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                shippingAddress: true,
            },
        });

        return Response.json({
            success: true,
            message: "Order Successfully updated.",
            order,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR while Updating the Order:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while Updating the Order."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}