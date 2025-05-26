"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { authStore } from '@/store/Auth'
import { cartStore } from '@/store/Cart'
import CheckoutSkeletonLoader from './CheckoutSkeletonLoader'
import EditAddressModal from './EditAddressModal'
import { toast } from 'react-toastify'

interface CartItem {
    id: string;
    title: string;
    quantity: number;
    price: number;
    imageUrl: string;
}


interface OrderItemType {
    id?: number;
    productId: string;
    quantity: number;
    price: number;
}

interface OrderDataType {
    subTotal: number;
    taxPrice: number;
    deliveryCharges: number;
    totalPrice: number;
    quantity: number;
    addressId: number;
    products: OrderItemType[];
    paymentStatus: "UNPAID" | "PAID";
}

const CartItemsCheckout = () => {

    const { authStatus, user, hydrated } = authStore();
    const { items } = cartStore();
    const cartTotal = cartStore((state) => state.getCartTotal());
    const removeItem = cartStore((state) => state.removeItem);

    const shippingCharges: number = cartTotal > 1000 ? 0 : 50;

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [taxPrice, setTaxPrice] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const calculatePrices = () => {
        setTaxPrice(cartTotal * 0.005);
        setTotalPrice(cartTotal + taxPrice + shippingCharges);
    };

    const transformCartToOrderItems = () => {
        return items.map((item) => ({
            productId: item.id, // Map `id` to `productId`
            quantity: item.quantity,
            price: item.price,
        }));
    };


    const handlePlaceOrder = async () => {
        setLoading(true);

        const orderItems = transformCartToOrderItems();

        const orderData: OrderDataType = {
            subTotal: cartTotal,
            taxPrice,
            totalPrice,
            deliveryCharges: shippingCharges,
            quantity: items?.length,
            addressId: 1,
            products: orderItems,
            paymentStatus: "UNPAID"
        }

        try {
            const response = await fetch("/api/orders/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData)
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success("Order placed successfully!");
                router.push(`/orders/${responseData?.order?.id}`); // Redirect to success page
            } else {
                toast.error(responseData.error.message || "Failed to place order.");
            }

        } catch (err) {
            toast.error("Something went wrong while placing the order.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!hydrated) return;
        if (!authStatus || !user) {
            router.push("/sign-in");
            return;
        }

        if (items?.length > 0) {
            calculatePrices();
        }
        setLoading(false);
    }, [authStatus, hydrated, user, items, taxPrice]);

    if (loading) {
        return <CheckoutSkeletonLoader />
    }

    return (
        <div className="flex justify-between items-start gap-10 md:gap-20 lg:gap-28 xl:gap-40 flex-col md:flex-row">
            <div className="flex flex-1 flex-col gap-8 w-full">
                <h2 className="text-2xl font-semibold">Checkout</h2>
                {/* ITEMS */}
                {
                    items?.map((item) => (
                        <div
                            key={item?.id}
                            // onClick={() => router.push(`products/${item.slug}`)}
                            className="flex gap-4 cursor-pointer"
                        >
                            <Image
                                src={item?.imageUrl}
                                alt={item?.title}
                                width={85}
                                height={85}
                                className="object-cover rounded-lg h-[100px]"
                            />
                            <div className="flex flex-col justify-between w-full">
                                {/* TOP */}
                                <div className="flex flex-col justify-between items-start gap-3">
                                    <div className="flex justify-between w-full">
                                        <h3 className="font-semibold text-base sm:text-lg">{item?.title}</h3>
                                        <span className="text-sm sm:text-base">{formatPrice(item?.price)}</span>
                                    </div>
                                    {/* <span className="text-sm text-gray-600">{item?.description}</span> */}
                                </div>
                                {/* BOTTOM */}
                                <div className="flex justify-between text-sm">
                                    {/* <QuantitySelector productId={item?.id!} stockNumber={item?.stock} initialQuantity={2} /> */}
                                    <span className="text-sm text-gray-500 font-semibold">Qty. {item?.quantity}</span>
                                    <span onClick={() => removeItem(item?.id)} className="text-red-500 cursor-pointer">Remove</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-1 flex-col gap-7 bg-violet-50 p-6 sm:p-10 rounded-md w-full">
                <h2 className="text-2xl text-gray-800">Order Summary</h2>
                <div className="flex items-center justify-between text-gray-800 text-sm sm:text-base">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-normal">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-800 text-sm sm:text-base">
                    <span className="font-medium">Tax (+5% GST)</span>
                    <span className="font-normal">{formatPrice(taxPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-800 text-sm sm:text-base">
                    <span className="font-medium">Shipping Charges</span>
                    <span className="font-normal">{formatPrice(shippingCharges)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-800 text-sm sm:text-base">
                    <span className="font-medium">Total</span>
                    <span className="font-normal">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-start justify-between text-gray-800 text-sm sm:text-base">
                    <span className="font-medium">Shipping Address</span>
                    <div className="flex flex-col justify-center items-end gap-2 w-1/2 sm:w-1/3">
                        <span className="font-normal">Subhash Bhavan, Tikla road, Vaishali Nagar, New Delhi, IN.</span>
                        <span
                            onClick={() => setEditModalOpen(true)}
                            className="font-normal text-sm text-blue-500 cursor-pointer"
                        >
                            Change Address
                        </span>
                    </div>
                </div>
                <button
                    onClick={handlePlaceOrder}
                    className="mt-4 w-full sm:w-32 bg-violet-500 text-white rounded-lg cursor-pointer ring-1 hover:ring-violet-500 py-2 px-4 hover:bg-white hover:text-violet-500 disabled:bg-violet-200 disabled:cursor-not-allowed disabled:ring-0 disabled:text-white disabled:ring-none"
                >
                    Place Order
                </button>
            </div>
            {
                editModalOpen && (
                    <EditAddressModal
                        address={user?.address ? user.address[0] : null}
                        modalState={setEditModalOpen}
                    />
                )
            }
        </div>
    )
}

export default CartItemsCheckout;