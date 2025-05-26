"use client"

import { authStore } from "@/store/Auth"
import { cartStore } from "@/store/Cart"
import { formatPrice } from "@/lib/utils"
import { ProductType } from "@/types/types"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { IoBagHandle } from "react-icons/io5";

const ProductCard = ({ products }: { products: ProductType[] }) => {

    const { authStatus } = authStore();
    const { addItem } = cartStore();
    const router = useRouter();

    const handleBuyProduct = (productId: string) => {
        if (!authStatus) {
            router.push("/sign-in");
            return;
        }
        router.push(`/checkout?productId=${productId}&quantity=1`);
    }

    return (
        <div className="my-12 flex flex-wrap gap-x-8 gap-y-16 items-start">
            {
                products?.length ? (
                    products.map((product) => (
                        <div
                            key={product?.id}
                            className="w-full flex flex-col gap-7 sm:w-[45%] lg:w-[22%] hover:scale-105 transition-all ease-in-out duration-75"
                        >
                            <div
                                onClick={() => router.push(`/products/${product?.slug}`)}
                                className="flex flex-col w-full gap-4 cursor-pointer"
                            >
                                <div className="relative w-full h-80">
                                    <Image
                                        src={product?.productImages[0]?.url}
                                        alt=""
                                        fill
                                        sizes="25vw"
                                        className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
                                    />
                                    <Image
                                        src={product?.productImages[1]?.url}
                                        alt=""
                                        fill
                                        sizes="25vw"
                                        className="absolute object-cover rounded-md"
                                    />
                                </div>
                                <p className="text-base text-violet-400 font-medium">Rating - {product?.rating}</p>
                                <span className="font-semibold text-lg text-gray-800">{product?.title?.length > 25 ? product?.title?.slice(0, 25) + "..." : product?.title}</span>
                                <p className="text-sm text-gray-600">{product?.description?.length > 35 ? product?.description?.slice(0, 35) + "..." : product?.description}</p>
                                <div className="flex justify-start items-center gap-3">
                                    <span className="font-medium text-base text-gray-500 line-through">{formatPrice(product?.actualPrice)}</span>
                                    <span className="font-medium text-base text-gray-600">{formatPrice(product?.discountedPrice)}</span>
                                    <span className="text-base text-gray-500">{product?.discount}% OFF</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => addItem(product, 1)}
                                    className="w-max px-3 py-2 text-sm ring-1 ring-violet-500 rounded-md text-violet-500 hover:bg-violet-500 hover:text-white"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => handleBuyProduct(product?.id!)}
                                    className="w-max px-3 py-2 text-sm bg-violet-500 rounded-md text-white hover:bg-white hover:text-violet-500 border hover:border-violet-500"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col justify-center items-center gap-4 text-gray-500 w-full min-h-[100px]">
                        <IoBagHandle className="text-5xl md:text-8xl" />
                        <h2 className="text-lg font-medium">No data Found.</h2>
                    </div>
                )
            }
        </div>
    )
}

export default ProductCard;