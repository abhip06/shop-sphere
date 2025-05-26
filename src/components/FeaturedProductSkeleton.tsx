import React from 'react'

const FeaturedProductSkeleton = () => {
    return (Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="ring-1 ring-gray-200 p-4 rounded-md w-full flex flex-col gap-4 sm:w-[45%] lg:w-[48%] animate-pulse">
            <div className="relative w-full h-96 bg-gray-300 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
            <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="flex items-center gap-4">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
    )))
}

export default FeaturedProductSkeleton