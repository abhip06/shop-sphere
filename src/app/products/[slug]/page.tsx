"use client"

import { authStore } from "@/store/Auth";
import { cartStore } from "@/store/Cart";
import Add from "@/app/products/_components/Add";
import ProductImages from "@/app/products/_components/ProductImages"
import ProductSkeletonLoader from "@/components/ProductSkeletonLoader";
import ReviewCard from "@/components/ReviewCard";
import { formatPrice } from "@/lib/utils";
import { ProductType } from "@/types/types";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface ReviewType {
  id: string;
  customer: { id: string; fullName: string; username: string };
  heading: string;
  body: string;
  rating: number;
  createdAt: string;
}

const reviews: ReviewType[] = [
  {
    id: "pmttnassj12345",
    customer: {
      id: "jkwdjkfd",
      fullName: "John Doe",
      username: "johndoe_001",
    },
    heading: "Fast Delivery",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, aspernatur quis similique quas ut veritatis beatae maiores.",
    rating: 4.5,
    createdAt: "14 Aprip 2024",
  },
  {
    id: "uwecoidj45465",
    customer: {
      id: "jkwdjkfd",
      fullName: "John Doe",
      username: "johndoe_001",
    },
    heading: "Trendy Products",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, aspernatur quis similique quas ut veritatis beatae maiores.",
    rating: 4.8,
    createdAt: "25 May 2024",
  },
  {
    id: "jfjjguij12785",
    customer: {
      id: "jkwdjkfd",
      fullName: "John Doe",
      username: "johndoe_001",
    },
    heading: "Value for Money Products",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, aspernatur quis similique quas ut veritatis beatae maiores.",
    rating: 5,
    createdAt: "10 May 2024",
  },
  {
    id: "uwecoid78fghi465",
    customer: {
      id: "jkwdjkfd",
      fullName: "John Doe",
      username: "johndoe_001",
    },
    heading: "Best Deal",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, aspernatur quis similique quas ut veritatis beatae maiores.",
    rating: 4.8,
    createdAt: "11 June 2024",
  },
];

const ProductPage = ({ params }: { params: { slug: string } }) => {

  const { authStatus } = authStore();
  const { addItem } = cartStore();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity); // Update the quantity
  };

  const handleBuyProduct = () => {
    if (!authStatus) {
      router.push("/sign-in");
      return;
    }
    router.push(`/checkout?productId=${product?.id}&quantity=${quantity}`);
  }

  useEffect(() => {

    const getProductInfo = async () => {

      setError(null);

      try {

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10 sec timeout

        const response = await fetch(`/api/products/${params.slug}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal
        });

        clearTimeout(timeout);

        if (response.status === 500) {
          setError("Something went wrong. Try again later.");
          return;
        }

        const responseData = await response.json();

        if (response.status === 200) {
          setProduct(responseData.product);
          return;
        }

        if (!response.ok) {
          console.log("Error occured while fetching product info.\n");
          setError(responseData.error?.message ?? "Error occured while fetching Product Info.");
          return;
        }
      } catch (error) {
        setError("Failed to fetch product info.");
        console.log("Error occured while fetching product info.\n", error);
      } finally {
        setLoading(false);
      }
    }

    getProductInfo();
  }, []);

  return !loading ? (
    <div className="px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-36 py-12 w-full h-full">
      {error || !product ? (
        <div className="flex justify-center items-center">{error}</div>
      ) : (
        <div className="relative flex flex-col lg:flex-row gap-16">
          {/* IMG */}
          <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
            <ProductImages productImages={product!.productImages} />
          </div>
          {/* TEXTS */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 text-gray-800">
            <h1 className="text-4xl font-medium">{product?.title}</h1>
            <p className="text-gray-500">{product?.description}</p>
            <p className="text-violet-500 font-light">Rating - {product?.rating}</p>

            <div className="h-[1px] bg-gray-500" />

            {product?.actualPrice === product?.discountedPrice ? (
              <h2 className="font-medium text-2xl">{formatPrice(product?.actualPrice)}</h2>
            ) : (
              <div className="flex items-center gap-4">
                <h3 className="text-lg text-gray-500 line-through">
                  {formatPrice(product?.actualPrice ?? 0)}
                </h3>
                <div className="p-2 rounded-md bg-violet-100">
                  <h3 className="text-sm font-light">
                    {product?.discount}% OFF
                  </h3>
                </div>
                <h2 className="font-medium text-2xl">
                  {formatPrice(product?.discountedPrice ?? 0)}
                </h2>
              </div>
            )}

            <button
              onClick={handleBuyProduct}
              className="my-4 w-full sm:w-36 bg-violet-500 text-white rounded-lg cursor-pointer ring-1 hover:ring-violet-500 py-2 px-4 hover:bg-white hover:text-violet-500 disabled:bg-violet-200 disabled:cursor-not-allowed disabled:ring-0 disabled:text-white disabled:ring-none"
            >
              Buy Now
            </button>

            <div className="h-[1px] bg-gray-500" />

            <div className="flex w-full justify-between items-center">
              <Add
                stockNumber={product?.stock || 0}
                onQuantityChange={handleQuantityChange}
              />

              <button
                onClick={() => addItem(product, quantity)}
                className="w-max h-max text-sm rounded-lg ring-1 ring-violet-500 text-violet-500 py-3 px-5 hover:bg-violet-500 hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
              >
                Add to Cart
              </button>
            </div>

            <div className="h-[1px] bg-gray-500" />

            {/* PRODUCT INFO SECTION */}
            <h1 className="text-2xl">Product Info</h1>
            {product?.additionalProductInfo?.map((section: any) => (
              <div className="mb-1" key={section.title}>
                <h4 className="font-medium mb-1 text-base">{section.title}</h4>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            ))}

            <div className="h-[1px] bg-gray-500" />

            {/* REVIEWS */}
            <h1 className="text-2xl">Customer Reviews</h1>
            <Suspense fallback="Loading...">
              <div
                className="flex flex-col justify-center items-start w-full"
              >
                {
                  reviews.map((review: any) => (
                    <ReviewCard
                      key={review.id}
                      id={review.id}
                      customer={review.customer}
                      heading={review.heading}
                      body={review.body}
                      rating={review.rating}
                      createdAt={review.createdAt}
                    />
                  ))
                }
              </div>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  ) : (
    <ProductSkeletonLoader />
  )
}

export default ProductPage