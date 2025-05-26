"use client"

import { useEffect } from "react";

const Loader = () => {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 flex-col gap-5 text-violet-500">
            <div
                className="inline-block animate-spin rounded-full border-4 border-solid border-current border-r-gray-300 motion-reduce:animate-[spin_1.5s_linear_infinite] h-16 w-16 md:h-24 md:w-24"
                role="status">
            </div>
            <span className="text-base text-gray-400">Please wait a while...</span>
        </div>
    )
}

export default Loader