
const UsersLoadingSkeleton = () => {
    return (
        <div className="h-full w-full animate-pulse">
            <div className="flex flex-col items-start gap-8 p-5 bg-gray-800 rounded-md">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center gap-5 w-full">
                        <div className="h-5 w-1/12 bg-gray-300 rounded-lg"></div>
                        <div className="h-5 w-3/12 bg-gray-300 rounded-lg"></div>
                        <div className="h-5 w-5/12 bg-gray-300 rounded-lg"></div>
                        <div className="h-5 w-3/12 bg-gray-300 rounded-lg"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersLoadingSkeleton;