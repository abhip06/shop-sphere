

const ProductSkeletonLoader = () => {
    return (
      <div className="px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-36 my-12 w-full h-full">
        <div className="relative flex flex-col lg:flex-row gap-16 animate-pulse">
          {/* Image Skeleton */}
          <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
            <div className="bg-gray-300 rounded-md h-[500px] w-full"></div>
            <div className="flex gap-4 mt-8">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  className="w-1/4 h-32 bg-gray-300 rounded-md"
                  key={i}
                ></div>
              ))}
            </div>
          </div>
  
          {/* Text Skeleton */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Title */}
            <div className="h-10 bg-gray-300 rounded-md w-3/4"></div>
            
            {/* Description */}
            <div className="h-6 bg-gray-300 rounded-md w-full"></div>
            <div className="h-6 bg-gray-300 rounded-md w-5/6"></div>
            <div className="h-6 bg-gray-300 rounded-md w-2/3"></div>
  
            {/* Rating */}
            <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
  
            {/* Price */}
            <div className="h-10 bg-gray-300 rounded-md w-1/2"></div>
  
            {/* Buttons */}
            <div className="flex items-center gap-4">
              <div className="h-12 bg-gray-300 rounded-md w-32"></div>
              <div className="h-12 bg-gray-300 rounded-md w-32"></div>
            </div>
  
            {/* Divider */}
            <div className="h-[1px] bg-gray-500" />
  
            {/* Additional Product Info */}
            <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded-md w-full"></div>
            <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
  
            {/* Divider */}
            <div className="h-[1px] bg-gray-500" />
  
            {/* Reviews */}
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  className="flex gap-4 items-start w-full"
                  key={i}
                >
                  <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                  <div className="flex flex-col w-full gap-2">
                    <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
                    <div className="h-3 bg-gray-300 rounded-md w-full"></div>
                    <div className="h-3 bg-gray-300 rounded-md w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductSkeletonLoader;
  