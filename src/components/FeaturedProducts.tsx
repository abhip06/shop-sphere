"use client"

import { formatPrice } from "@/lib/utils"
import { ProductType } from "@/types/types";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FeaturedProductSkeleton from "./FeaturedProductSkeleton";


const FeaturedProducts = () => {
    const router = useRouter();

    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/products?sort=asc+lastUpdated&limit=2");
            const data = await response.json();

            setProducts(data.products);

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="mt-12 flex flex-wrap gap-x-4 lg:gap-x-8 gap-y-5 lg:gap-y-16 justify-center">
                <FeaturedProductSkeleton />
            </div>
        )
    }

    if(!loading && !products){
        return (
            <div className="mt-12 flex justify-center items-center text-lg text-gray-400">
                No Featured Products found.
            </div>
        )
    }

    return (
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-5 lg:gap-y-16 justify-center">
            {products?.map((product) => (
                <div
                    key={product?.id}
                    onClick={() => router.push(`/products/${product?.slug}`)}
                    className="ring-1 ring-gray-300 p-4 rounded-md w-full flex flex-col gap-4 sm:w-[45%] lg:w-[48%] cursor-pointer hover:shadow-lg hover:shadow-violet-500"
                >
                    <div className="relative w-full h-96">
                        <Image
                            src={product?.productImages[0]?.url}
                            alt=""
                            fill
                            sizes="25vw"
                            className="absolute object-cover rounded-md z-10"
                        />
                    </div>
                    <p className="text-base text-violet-400 font-medium">Rating - {product?.rating}</p>
                    <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                        <span className="font-semibold text-xl text-gray-800">{product?.title}</span>
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-base text-gray-400 line-through">{formatPrice(product?.actualPrice)}</span>
                            <span className="font-medium text-base text-gray-700">{formatPrice(product?.discountedPrice)}</span>
                        </div>
                    </div>
                    <p className="text-base text-gray-600">{product?.description}</p>
                </div>
            ))}
        </div>
    )
}

export default FeaturedProducts;