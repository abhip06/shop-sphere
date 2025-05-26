
const AllProductsSkeleton = () => {
    return (
        <div className="h-full w-full animate-pulse">
            <div className="flex flex-col items-start gap-16">
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
        </div>
    )
}

export default AllProductsSkeleton