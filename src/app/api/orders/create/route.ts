import { db } from "@/db";
import { verifyAccessToken } from "@/lib/auth";
import { orderValidation } from "@/validations/createOrder.validation";

interface OrderItemType {
    id?: number;
    productId: string;
    quantity: number;
    price: number;
}

interface IncomingOrderData {
    subTotal: number;
    taxPrice: number;
    deliveryCharges: number;
    totalPrice: number;
    quantity: number;
    addressId: number;
    products: OrderItemType[];
    paymentStatus: "UNPAID" | "PAID";
}

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
            { status: 401 }
        );
    }

    const {
        subTotal,
        taxPrice,
        deliveryCharges,
        totalPrice,
        quantity,
        addressId,
        products,
        paymentStatus
    }: IncomingOrderData = await request.json();

    const validateData = orderValidation.safeParse({
        subTotal,
        taxPrice,
        deliveryCharges,
        totalPrice,
        quantity,
        addressId,
        customerId: user.id,
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

    try {
        const order = await db.order.create({
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
                paymentStatus: validateData.data.paymentStatus || "UNPAID",
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
            message: "Order Created Successfully.",
            order,
        },
            { status: 201 }
        );

    } catch (error) {
        console.log("ERROR while Creating an Order:\n", error);
        return Response.json({
            error: {
                code: "server_error",
                message: "Error occured while Creating an Order."
            },
            success: false,
        },
            { status: 500 }
        );
    }
}