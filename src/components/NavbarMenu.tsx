"use client"

import Link from "next/link";
import { useState } from "react"

import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose, IoIosSearch } from "react-icons/io";
import SearchInput from "./SearchInput";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authStore } from "@/store/Auth";
import { cartStore } from "@/store/Cart";


const NavbarMenu = () => {

    const { authStatus, logout } = authStore();
    const { items } = cartStore();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 500) {
                toast.error("Something went wrong. Try again later.");
                return;
            }

            const responseData = await response.json();

            if (response.status === 200) {
                setOpen(false);
                logout();
                toast.success(responseData?.message);
                return router.push("/sign-in");
            }

            if (!response.ok) {
                toast.error(responseData.error?.message);
                return;
            }

        } catch (error) {
            toast.error("Something went wrong. Try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-3">
            {
                searchOpen ? (
                    <IoMdClose
                        onClick={() => setSearchOpen(false)}
                        className="text-3xl text-gray-900 cursor-pointer"
                    />) :
                    <IoIosSearch
                        onClick={() => setSearchOpen(true)}
                        className="text-3xl text-gray-900 cursor-pointer"
                    />
            }
            <SearchInput searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
            {
                open ? (
                    <span
                        className="text-3xl cursor-pointer text-gray-800"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <IoMdClose />
                    </span>
                ) : (
                    <span
                        className="text-2xl cursor-pointer text-gray-700"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <RiMenu3Fill />
                    </span>
                )
            }
            {
                open &&
                <div
                    className="w-full absolute bg-gray-800 text-white top-20 left-0 h-[calc(100vh-80px)] flex flex-col justify-start items-start gap-8 pl-10 pt-16 text-lg z-10"
                >
                    <Link href={"/"}>Home</Link>
                    <Link href={"/products"}>Products</Link>
                    <Link href={"/about"}>About</Link>
                    <Link href={"/cart"}>Cart ({items.length})</Link>
                    {authStatus && <button onClick={handleLogout}>Sign Out</button>}
                </div>
            }
        </div>
    )
}

export default NavbarMenu