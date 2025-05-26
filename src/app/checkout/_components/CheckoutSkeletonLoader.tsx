

const CheckoutSkeletonLoader = () => {
    return (
        <div className="h-full w-full animate-pulse">            
            <div className="flex justify-between items-start gap-10 md:gap-20 lg:gap-28 xl:gap-40 flex-col md:flex-row">
                {/* Product List Skeleton */}
                <div className="flex flex-1 flex-col gap-8 w-full">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-4 w-full">
                            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                            <div className="flex flex-col justify-between w-full">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
                                    <div className="h-5 w-16 bg-gray-300 rounded"></div>
                                </div>
                                <div className="h-4 w-3/4 bg-gray-300 rounded mb-3"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-4 w-12 bg-gray-300 rounded"></div>
                                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Skeleton */}
                <div className="flex flex-1 flex-col gap-7 bg-gray-100 p-6 sm:p-10 rounded-md w-full">
                    <div className="h-7 w-48 bg-gray-300 rounded"></div>

                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-full bg-gray-300 rounded"></div>

                    <div className="h-4 w-3/4 bg-gray-300 rounded mb-5"></div>
                    
                    <div className="w-full sm:w-32 h-10 bg-gray-300 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSkeletonLoader;