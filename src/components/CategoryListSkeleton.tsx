const CategoryListSkeleton = () => {
    return (
        <div className="flex gap-4 md:gap-8 overflow-x-scroll scrollbar-hide">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6 animate-pulse">
                    <div className="bg-gray-300 h-96 w-full rounded"></div>
                    <div className="mt-5 h-6 bg-gray-300 w-3/4 rounded"></div>
                </div>
            ))}
        </div>
    );
};

export default CategoryListSkeleton;