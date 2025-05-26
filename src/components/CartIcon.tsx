"use client"

import { cartStore } from "@/store/Cart";
import { SetStateAction } from "react";
import { CiShoppingCart } from "react-icons/ci";

const CartIcon = ({
    cartOpen,
    setCartOpen
}: {
    cartOpen: boolean;
    setCartOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
    
    const {items} = cartStore();

    return (
        <div
            className="cursor-pointer relative py-3 pr-2"
            onClick={() => setCartOpen(!cartOpen)}
        >
            <CiShoppingCart className="text-4xl text-gray-800" />
            <div
                className="flex justify-center items-center absolute bg-violet-500 rounded-full top-0 right-0 py-1 px-2"
            >
                <span className="text-white text-xs">{items?.length}</span>
            </div>
        </div>
    )
}

export default CartIcon