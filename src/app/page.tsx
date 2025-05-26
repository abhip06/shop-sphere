import CategoryList from "@/components/CategoryList";
import FeaturedProducts from "@/components/FeaturedProducts";
import NewArrivalList from "@/components/NewArrivalList";
import ReviewCarousel from "@/components/ReviewCarousel";
import SaleTimer from "@/components/SaleTimer";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <>
      <Slider />

      <div className="mt-28 font-medium text-gray-800 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-60">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <h3 className="text-sm text-gray-500 font-semibold">EXPLORE NOW</h3>
          <div className="w-[4rem] bg-pink-300 h-1 md:h-2 rounded-xl"></div>
          <h1 className="text-2xl font-medium text-gray-800">New Products</h1>
        </div>
        <NewArrivalList />
      </div>

      <div className="mt-28">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <h3 className="text-sm text-gray-500 font-semibold">SHOP ON</h3>
          <div className="w-[4rem] bg-cyan-300 h-1 md:h-2 rounded-xl"></div>
          <h1 className="text-2xl font-medium text-gray-800">Categories</h1>
        </div>
        <CategoryList />
      </div>

      <div className="mt-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-60">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <h3 className="text-sm text-gray-500 font-semibold">SHOP NOW</h3>
          <div className="w-[4rem] bg-violet-300 h-1 md:h-2 rounded-xl"></div>
          <h1 className="mb-5 text-2xl font-medium text-gray-800">Featured Products</h1>
          <SaleTimer />
        </div>
        <FeaturedProducts />
      </div>

      <div className="mt-28">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <h1 className="text-xl font-semibold text-gray-500">CUSTOMER REVIEWS</h1>
          <div className="w-[5rem] bg-orange-300 h-1 md:h-2 rounded-xl"></div>
        </div>
        <ReviewCarousel />
      </div>
    </>
  );
}
