"use client"

import Loader from '@/components/Loader';
import { formatDateTime, formatPrice } from '@/lib/utils';
import { Order } from '@/types/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { GrStatusGood } from 'react-icons/gr';
import { toast } from 'react-toastify';
import InvoiceTemplate from './InvoiceTemplate';

const OrderDetails = ({ orderId }: { orderId: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<Boolean>(true);
    const [order, setOrder] = useState<Order | null>(null);

    const fetchOrderInfo = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}`);
            const responseData = await response.json();

            if (!responseData.success) {
                toast.error(responseData?.message || "Could'nt fetch Order info.");
                return;
            }

            setOrder(responseData.order);
            console.log(responseData.order);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrderInfo();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col min-h-[calc(100vh-175px)] md:min-h-[calc(100vh-80px)] py-10 items-center justify-center px-5 md:px-auto">
                <Loader />
            </div>
        )
    }

    return (
        <div className="bg-gray-900 flex flex-col min-h-[calc(100vh-175px)] md:min-h-[calc(100vh-80px)] py-10 items-center justify-center px-5 md:px-auto">
            <div
                className="bg-gray-900 text-white shadow-[rgba(255,255,255,0.1)_0px_0px_25px_10px] rounded-md px-8 md:px-12 py-8 md:py-12 w-full sm:w-2/3 lg:w-1/3"
            >
                <div className="flex items-center gap-2 text-green-500 text-3xl md:text-4xl font-medium"><GrStatusGood /> Success</div>
                <h1 className="mt-4 sm:mt-8 text-xl sm:text-2xl">Order Details</h1>
                <div className="mt-4 sm:mt-8 flex flex-col gap-4">
                    <div className="text-sm flex items-center gap-3">
                        <span className="font-medium">Order Id: </span>
                        <span>{orderId}</span>
                    </div>
                    <div className="text-sm flex items-center gap-3">
                        <span className="font-medium">Date & Time: </span>
                        <span>
                            {formatDateTime(order?.createdAt!)}
                        </span>
                    </div>
                    <div className="text-sm flex items-center gap-3">
                        <span className="font-medium">Receiver Name: </span>
                        <span>
                            {order?.customer?.fullName}
                        </span>
                    </div>
                    <div className="text-sm flex items-center gap-3">
                        <span className="font-medium">Receiver Email: </span>
                        {/* <span>johndoe01@gmail.com</span> */}
                        <span>{order?.customer?.email}</span>
                    </div>
                    <div className="text-sm flex items-center gap-3">
                        <span className="font-medium">Receiver Phone no.: </span>
                        <span>+91 9876543210</span>
                    </div>
                    <div className="text-sm flex items-center gap-3">
                        <span className="font-medium">Amount Paid: </span>
                        <span>{formatPrice(order?.totalPrice!)}</span>
                        {/* <span>{order?.priceSummary?.subtotal?.amount}</span> */}
                    </div>
                    <div className="text-sm flex items-center gap-3">
                        <span className="font-medium">Payment Status: </span>
                        <span className={`${order?.paymentStatus === "PAID" ? "text-green-500" : "text-red-500"}`}>{order?.paymentStatus}</span>
                        {/* <span>{order?.paymentStatus}</span> */}
                    </div>
                    <div className="text-sm flex items-center gap-3">
                        <span className="font-medium">Order Status: </span>
                        <span className="text-orange-400">{order?.orderStatus}</span>
                        {/* <span>{order.orderStatus}</span> */}
                    </div>
                    <div className="text-sm flex items-start gap-3">
                        <span className="font-medium">Delivery Address: </span>
                        <span>
                            {order?.shippingAddress?.line1 + ", "}
                            {order?.shippingAddress?.city + " "}<br />
                            {order?.shippingAddress?.state + ", "}
                            {"Pincode - " + order?.shippingAddress?.pincode + " "}<br />
                            {order?.shippingAddress?.country?.toUpperCase()}<br />
                            {/* Subhash Bhavan, Tikla road, Vaishali Nagar, New Delhi, IN. */}
                        </span>
                    </div>
                    <span
                        className="mt-5 w-max text-blue-500 underline cursor-pointer hover:text-blue-400"
                    >
                        Download Invoice
                    </span>
                </div>
            </div>
            <Link href="/" className="mt-12 text-white text-sm">
                Have a problem? Contact us at support@shopsphere.in
            </Link>
            <InvoiceTemplate
                orderId={orderId}
                customerName={order?.customer?.fullName ?? "john doe"}
                email={order?.customer?.email ?? "john doe"}
                phone={"john doe"}
                items={order?.OrderItem!}
                totalAmount={order?.totalPrice!}
                paymentMethod={"UPI"}
                paymentStatus={"PAID"}
                address={order?.shippingAddress!}
                date={order?.createdAt!}
            />
        </div>
    )
}

export default OrderDetails;