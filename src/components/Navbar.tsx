import Link from "next/link"
import NavbarMenu from "./NavbarMenu"
import NavIcons from "./NavIcons"

import { FiShoppingBag } from "react-icons/fi";

const Navbar = () => {
    return (
        <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 relative">
            {/* MOBILE */}
            <div className="md:hidden h-full flex justify-between items-center">
                <Link href={"/"}>
                    <div
                        className="flex items-center gap-2 text-2xl font-medium"
                    >
                        <FiShoppingBag className="text-violet-500 text-2xl font-extrabold" />
                        <div>
                            <span className="text-violet-500 tracking-wider">Shop</span>
                            <span className="text-gray-800 tracking-wider">Sphere</span>
                        </div>
                    </div>
                </Link>
                <NavbarMenu />
            </div>

            {/* BIGGER SCREENS */}
            <div className="hidden md:flex justify-between items-center gap-8 h-full w-full">
                {/* LEFT */}
                <div
                className="flex items-center justify-between w-full md:w-2/3 lg:w-1/2"
                >
                    <Link href={"/"}>
                        <div
                            className="flex items-center gap-2 text-2xl font-medium"
                        >
                            <FiShoppingBag className="text-violet-500 text-3xl font-extrabold" />
                            <div>
                                <span className="text-violet-500 tracking-wider">Shop</span>
                                <span className="text-gray-800 tracking-wider">Sphere</span>
                            </div>
                        </div>
                    </Link>
                    <div className="flex gap-6">
                        <Link href={"/"} className="text-gray-800 hover:text-violet-500">Home</Link>
                        <Link href={"/products"} className="text-gray-800 hover:text-violet-500">Products</Link>
                        <Link href={"/about"} className="text-gray-800 hover:text-violet-500">About</Link>
                    </div>
                </div>
                {/* RIGHT */}
                <div
                className="flex items-center justify-between gap-8"
                >
                    <NavIcons />
                </div>
            </div>
        </div>
    )
}

export default Navbar