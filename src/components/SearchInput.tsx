"use client"

import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

import { IoIosSearch } from "react-icons/io";

const SearchInput = ({
    searchOpen,
    setSearchOpen,
}: {
    searchOpen: boolean;
    setSearchOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const debouncedQuery = useDebounce(searchQuery, 500);
    const router = useRouter();

    // Handle navigation when debouncedQuery updates
    useEffect(() => {
        if (debouncedQuery.trim()) {
            const encodedQuery = encodeURIComponent(debouncedQuery).replace(/%20/g, "+");
            console.log("Search Input -> " + encodedQuery);
            router.push(`/products?search=${encodedQuery}`);
        }
    }, [debouncedQuery]);


    return searchOpen && (
        <div className="w-full flex flex-col justify-center items-center px-4 md:px-12 lg:px-20 xl:px-40 py-4 md:py-7 absolute top-full left-0 z-20 bg-gray-100">
            <div
                className="flex items-center justify-between w-full bg-white rounded-md p-3"
            >
                <input
                    type="text"
                    name="title"
                    value={searchQuery}
                    placeholder="Search Here"
                    className="w-full overflow-hidden outline-none"
                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                />

                <button
                    type="submit"
                    className="text-2xl md:text-3xl text-gray-700 mx-3"
                    onClick={() => {
                        if (searchQuery.trim()) {
                            const encodedQuery = encodeURIComponent(searchQuery).replace(/%20/g, "+");
                            router.push(`/products?search=${encodedQuery}`);
                        }
                    }}
                >
                    <IoIosSearch />
                </button>
            </div>
        </div>

    )
}

export default SearchInput;