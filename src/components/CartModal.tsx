"use client"

import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { cartStore } from "@/store/Cart";

import { BsBagX } from "react-icons/bs";
import { authStore } from "@/store/Auth";

const CartModal = () => {

    const { authStatus } = authStore();

    const cartItems = cartStore((state) => state.items);
    const cartTotal = cartStore((state) => state.getCartTotal());
    const removeItem = cartStore((state) => state.removeItem);
    const clearCart = cartStore((state) => state.clearCart);

    const router = useRouter();

    return (
        <div className={`border max-h-[625px] w-max absolute p-8 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-20 right-4 md:right-8 lg:right-16 xl:right-32 flex flex-col gap-6 z-20`}>
            {cartItems.length === 0 ? (
                <div className="p-10 flex flex-col justify-center items-center gap-3 text-gray-600 text-sm font-light">
                    <BsBagX className="text-5xl" />
                    <h2 className="text-lg font-medium">Your Shopping Cart is Empty</h2>
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-medium">Shopping Cart</h2>
                    <div className="flex flex-col gap-8 overflow-y-scroll">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={75}
                                    height={75}
                                    className="object-cover rounded-lg w-20 h-24"
                                />
                                <div className="flex flex-col justify-between w-full">
                                    {/* TOP */}                                     <div className="flex flex-col justify-between items-start gap-3">
                                        <div className="flex justify-between w-full">
                                            <h3 className="font-semibold w-60">{item?.title}</h3>
                                            <span className="text-sm">{formatPrice(item?.price * item?.quantity)}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">Available</span>
                                    </div>
                                    {/* BOTTOM */}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Qty. {item?.quantity}</span>
                                        <span onClick={() => removeItem(item?.id)} className="text-red-500 cursor-pointer">Remove</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2">
                        <div className="flex items-center justify-between font-semibold">
                            <span>Subtotal</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <p className="text-gray-500 mt-4 mb-6 text-sm">Shipping and taxes are claculated on Checkout</p>
                        <div className="flex justify-between text-sm ">
                            <button
                                onClick={clearCart}
                                className="rounded-md py-3 px-4 bg-red-500 text-white hover:bg-red-700"
                            >
                                Clear Cart
                            </button>
                            <button
                                className="rounded-md py-3 px-4 bg-gray-600 text-white hover:bg-gray-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                disabled={!authStatus}
                                onClick={() => router.push("/checkout")}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div >
    );
};

export default CartModal;