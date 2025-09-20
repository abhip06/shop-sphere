
import ProductList from "@/app/products/_components/ProductList"
import Loader from "@/components/Loader";
import { Metadata } from "next"
import Image from "next/image"
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
};

const page = () => {

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-40 relative">
      {/* BANNER */}
      <div className="hidden bg-violet-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-800">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-violet-500 text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image
          src="/bannerImg1.jpg"
          alt=""
          fill
          sizes="100%"
          priority
          className="object-contain"
          />
        </div>
      </div>

      {/* PRODUCT LISTING */}
      <Suspense fallback={<Loader />}>
        <ProductList />
      </Suspense>

    </div>
  );
}

export default page