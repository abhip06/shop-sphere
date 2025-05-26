import React from 'react'

const BtnLoader = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-3 text-ehite">
            <div
                className="inline-block animate-spin rounded-full border-2 border-solid border-current border-r-gray-200 motion-reduce:animate-[spin_1.5s_linear_infinite] h-5 w-5"
                role="status">
            </div>
        </div>
    )
}

export default BtnLoader;