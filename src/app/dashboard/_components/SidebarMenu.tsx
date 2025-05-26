import Link from 'next/link'
import React from 'react'

import { CiHome, CiSettings } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
import { FaVolleyballBall } from "react-icons/fa";
import { MdLibraryAddCheck, MdOutlineExplore } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { SiGoogleanalytics } from "react-icons/si";
import { IoIosHelpCircleOutline } from "react-icons/io";

const SidebarMenu = () => {
    return (
        <div className="flex flex-col items-start gap-10 bg-transparent">
            <div className="flex flex-col gap-5 px-3 items-start">
                <Link href={"/dashboard"} className="flex items-center gap-3 text-base text-gray-400 font-light hover:text-violet-500"><CiHome className="text-lg" /> Home</Link>
                <Link href={"/dashboard/orders"} className="flex items-center gap-3 text-base text-gray-400 font-light hover:text-violet-500"><FaVolleyballBall className="text-lg" /> Orders</Link>
                <Link href={"/dashboard/products"} className="flex items-center gap-3 text-base text-gray-400 font-light hover:text-violet-500"><LuShoppingBag className="text-lg" /> Products</Link>
                <Link href={"/dashboard/add-product"} className="flex items-center gap-3 text-base text-gray-400 font-light hover:text-violet-500"><MdLibraryAddCheck className="text-lg" /> New Product</Link>
                <Link href={"/dashboard/users"} className="flex items-center gap-3 text-base text-gray-400 font-light hover:text-violet-500"><HiOutlineUsers className="text-lg" /> Users</Link>
            </div>
            <div className="flex flex-col gap-4 items-start">
                <h2 className="text-base font-extralight">Tools</h2>
                <div className="flex flex-col gap-5 px-3 items-start">
                    <Link href={"/dashboard/analytics"} className="flex items-center gap-3 text-base text-gray-400 font-light hover:text-violet-500"><SiGoogleanalytics className="text-lg" /> Analytics</Link>
                    <Link href={"/dashboard/explore"} className="flex items-center gap-3 text-base text-gray-400 font-light hover:text-violet-500"><MdOutlineExplore className="text-lg" /> Explore</Link>
                    <Link href={"/dashboard/settings"} className="flex items-center gap-3 text-base text-gray-400 font-light hover:text-violet-500"><CiSettings className="text-lg" /> Settings</Link>
                    <Link href={"/dashboard/help"} className="flex items-center gap-3 text-base text-gray-400 font-light hover:text-violet-500"><IoIosHelpCircleOutline className="text-lg" /> Help</Link>
                </div>
            </div>
        </div>
    )
}

export default SidebarMenu