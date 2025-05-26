"use client"

import Link from "next/link";
import { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DashboardNavIcons = () => {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const [notificationOpen, setNotificationOpen] = useState(false);

    return (
        <div className="flex items-center justify-center gap-6 relative">
            <div
                onClick={() => setNotificationOpen(!notificationOpen)}
                className={`relative cursor-pointer flex justify-center items-center w-10 h-10 text-center rounded-full text-xl ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"}`}
            >
                <div className="absolute top-0 right-0 bg-red-600 w-2 h-2 rounded-full"></div>
                <IoMdNotifications />
            </div>

            {notificationOpen && <div
                className={`${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"} w-max flex flex-col items-start justify-center gap-4 text-base absolute top-14 right-0 rounded-lg p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20`}
            >
                <Link href={"/my-account/randomGuy123"} className="flex flex-col items-start gap-2">
                    <h3 className="text-base font-medium">Notification Title</h3>
                    <span className="text-sm text-gray-500 font-light">Description</span>
                </Link>
                <Link href={"/my-account/randomGuy123"} className="flex flex-col items-start gap-2">
                    <h3 className="text-base font-medium">Notification Title</h3>
                    <span className="text-sm text-gray-500 font-light">Description</span>
                </Link>
                <Link href={"/my-account/randomGuy123"} className="flex flex-col items-start gap-2">
                    <h3 className="text-base font-medium">Notification Title</h3>
                    <span className="text-sm text-gray-500 font-light">Description</span>
                </Link>
            </div>}

            <div
                className={`flex justify-center items-center w-10 h-10 text-center cursor-pointer rounded-full text-xl ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"}`}
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </div>

        </div>
    )
}

export default DashboardNavIcons