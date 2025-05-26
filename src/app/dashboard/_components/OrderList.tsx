"use client"

import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import AllProductsSkeleton from "./AllProductsSkeleton";

interface OrderItem {
    id: number;
    productId: string;
    quantity: number;
    price: number;
    product: {
        title: string;
        slug: string;
        productImages: { url: string }[];
    };
}

interface Order {
    id: string;
    subTotal: number;
    taxPrice: number;
    totalPrice: number;
    deliveryCharges: number;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
    OrderItem: OrderItem[];
    shippingAddress: {
        line1: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
    };
    customer: {
        fullName: string;
        email: string;
    };
}

const OrderList = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchAllOrders = async () => {
        try {
            const response = await fetch("/api/orders");

            if (!response.ok) {
                setError("Error while fetching all Orders");
                return;
            }

            const data = await response.json();
            setOrders(data.orders);

        } catch (err) {
            setError("Could not fetch all Orders.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    if (loading) {
        return (
            <AllProductsSkeleton />
        )
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Orders */}
            {
                orders?.map((order) => (
                    <div
                        key={order?.id}
                        className="flex gap-8 bg-gray-800 p-5 rounded-lg"
                    >
                        {order.OrderItem[0]?.product?.productImages[0]?.url && (
                            <Image
                                src={order?.OrderItem[0]?.product?.productImages[0]?.url}
                                alt={order?.OrderItem[0]?.product?.title}
                                width={150}
                                height={85}
                                className="object-cover rounded-lg"
                            />
                        )}
                        <div className="flex flex-col justify-between gap-7 w-full">
                            {/* TOP */}
                            <div className="flex flex-col items-start orders-start gap-3 w-full">
                                <span className="text-sm sm:text-base">Amount: {formatPrice(order?.totalPrice)}</span>
                                <h3
                                    className="text-sm"
                                >
                                    Payment Status: {" "}
                                    <span
                                        className={`${order?.paymentStatus === "PAID" ? "text-green-500" : "text-red-500"}`}
                                    >
                                        {order?.paymentStatus}
                                    </span>
                                </h3>
                                <h3
                                    className="text-sm"
                                >
                                    Order Status: {" "}
                                    <span
                                        className={`${order?.orderStatus === "IN PROGRESS" ? "text-yellow-500" : "text-red-500"}`}
                                    >
                                        {order?.orderStatus}
                                    </span>
                                </h3>
                                <span
                                    className="text-sm"
                                >
                                    Shipping Address:<br />
                                    {order?.shippingAddress?.line1},<br />
                                    {order?.shippingAddress?.city}{", "}
                                    {order?.shippingAddress?.state}{", "}{order?.shippingAddress?.country.toUpperCase()}<br />
                                    {"Pincode - "}{order?.shippingAddress?.pincode}
                                </span>
                            </div>
                            {/* BOTTOM */}
                            <div className="flex justify-between text-sm">
                                <span className="text-blue-500 cursor-pointer">Edit Order Status</span>
                                <span className="text-red-500 cursor-pointer">Delete</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default OrderList;