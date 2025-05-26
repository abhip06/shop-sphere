"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import CategoryListSkeleton from "./CategoryListSkeleton";
import { capitalizeFirstLetter } from "@/lib/utils";

interface ProductImg {
    url: string;
}
interface ICategory {
    category: string;
    productImages: ProductImg[];
}

const CategoryList = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const fetchAllCategories = async () => {
        try {
            const response = await fetch("/api/products/get-category");
            if (!response.ok) {
                setErrorMessage("Failed to fetching All Categories data.");
                return;
            }

            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            setErrorMessage("Failed to fetching All Categories data.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllCategories();
    }, []);

    if (loading) {
        return (
            <div className="mt-12 px-8">
                <CategoryListSkeleton />
            </div>
        )
    }

    return (
        <div className="mt-12 px-8">
            <div className="flex gap-4 md:gap-8 overflow-x-scroll scrollbar-hide">
                {categories.map((item, index) => (
                    <Link href={`/products?category=${item?.category}`} key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6">
                        <div className="relative bg-slate-100 w-full h-96">
                            <Image
                                src={item?.productImages[0]?.url}
                                alt=""
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                        <h1 className="mt-5 font-light text-xl tracking-wide">
                            {capitalizeFirstLetter(item?.category)}
                        </h1>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList