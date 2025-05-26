"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import CartModal from "./CartModal";
import CartIcon from "./CartIcon";
import SearchInput from "./SearchInput";
import { toast } from "react-toastify";
import Image from "next/image";
import { authStore } from "@/store/Auth";

import { IoIosSearch, IoMdClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { VscAccount } from "react-icons/vsc";
import { TbBorderStyle } from "react-icons/tb";

const NavIcons = () => {

    const { authStatus, user, logout } = authStore();

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [porfileOpen, setProfileOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

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
                setProfileOpen(false);
                router.push("/sign-in");
                logout();
                toast.success(responseData?.message);
                return;
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
        <div className="flex items-center justify-center gap-3 xl:gap-5">
            {searchOpen && <SearchInput searchOpen={searchOpen} setSearchOpen={setSearchOpen} />}
            {
                searchOpen ?
                    <IoMdClose
                        onClick={() => setSearchOpen(false)}
                        className="text-3xl text-gray-900 cursor-pointer"
                    /> :
                    <IoIosSearch
                        onClick={() => setSearchOpen(true)}
                        className="text-3xl text-gray-900 cursor-pointer"
                    />
            }

            {
                authStatus ? <div
                    className="cursor-pointer"
                    onClick={() => setProfileOpen(!porfileOpen)}
                >
                    <Image
                        src="/avatar/user-avatar-1.png"
                        alt="avatar"
                        width={33}
                        height={33}
                        className=" rounded-full"
                    />
                </div> : (
                    <button
                        onClick={() => router.push("/sign-in")}
                        className="text-sm rounded-lg ring-1 ring-violet-500 text-violet-500 py-2 px-4 hover:bg-violet-500 hover:text-white"
                    >
                        Sign In
                    </button>
                )
            }
            {
                porfileOpen &&
                <div
                    className="w-max flex flex-col items-start justify-center gap-4 text-base bg-white absolute top-20 right-8 md:right-16 lg:right-24 xl:right-32 rounded-lg p-8 border shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20"
                >
                    <div className="flex flex-col items-start gap-1 w-full">
                        <p className="text-sm">Hello!</p>
                        <span className="text-lg font-semibold">{user?.fullName}</span>
                        <div className="bg-gray-500 h-[1px] w-full"></div>
                    </div>
                    {user?.role === "ADMIN" && <Link
                        onClick={() => setProfileOpen(false)}
                        href={"/dashboard"}
                        className="flex items-center justify-between gap-2 text-gray-800 hover:text-violet-500">
                        <RxDashboard className="text-xl" /> Dashboard
                    </Link>}
                    <Link
                        onClick={() => setProfileOpen(false)}
                        href={`/my-account/${user?.username}`}
                        className="flex items-center justify-between gap-2 text-gray-800 hover:text-violet-500">
                        <VscAccount className="text-xl" /> My Account
                    </Link>
                    <Link
                        onClick={() => setProfileOpen(false)}
                        href={"/my-orders"}
                        className="flex items-center justify-between gap-2 text-gray-800 hover:text-violet-500">
                        <TbBorderStyle className="text-xl" /> My Orders
                    </Link>
                    <div
                        onClick={handleLogout}
                        className="flex items-center justify-between gap-2 text-gray-800 hover:text-violet-500 cursor-pointer aria-disabled:cursor-not-allowed aria-disabled:text-gray-500"
                        aria-disabled={loading}
                    >
                        <CiLogout className="text-xl rotate-180" /> <span>Sign Out</span>
                    </div>

                </div>
            }
            <CartIcon cartOpen={cartOpen} setCartOpen={setCartOpen} />
            {
                cartOpen && <CartModal />
            }
        </div>
    )
}

export default NavIcons;