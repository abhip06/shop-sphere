import React from 'react'
import { IoIosSearch } from 'react-icons/io'

const DashboardSearchBar = () => {
    let darkMode = true;
    return (
        <div className={`flex items-center justify-between w-max rounded-md px-4 py-2 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}>
            <input
                type="text"
                name="name"
                placeholder="Search Here"
                className="w-full overflow-hidden outline-none bg-transparent"
            />

            <button className="text-2xl ml-3">
                <IoIosSearch />
            </button>

        </div>
    )
}

export default DashboardSearchBar