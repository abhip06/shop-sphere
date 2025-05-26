import { z } from "zod";

export const orderValidation = z.object({
    subTotal: z
        .number({ required_error: "Price is required" })
        .min(0, "Sub Total amount should not less than 0"),
    taxPrice: z
        .number({ required_error: "Tax Price is required" })
        .min(0, "Tax Price should not less than 0"),
    deliveryCharges: z
        .number({ required_error: "Delivery Charges is required" })
        .min(0, "Delivery Charges should not less than 0"),
    totalPrice: z
        .number({ required_error: "Total Price is required" })
        .min(0, "Total Price should not less than 0"),
    quantity: z
        .number({ required_error: "Quantity is required" })
        .min(0, "Quantity should not less than 0"),
    addressId: z
        .number({ required_error: "Address Id is required" }),
    customerId: z
        .string({ required_error: "Address Id is required" })
        .uuid(),
    products: z.object({
        productId: z
            .string({ required_error: "Product Id is required" })
            .uuid(),
        quantity: z
            .number({ required_error: "Quantity is required" })
            .min(0, "Quantity should not less than 0"),
        price: z
            .number({ required_error: "Price is required" })
            .min(0, "Price should not less than 0"),
    }).array(),
    paymentStatus: z
        .string({ required_error: "Payment Status is required" }),
});