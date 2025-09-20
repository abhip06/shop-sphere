"use client"

import { capitalizeFirstLetter } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

const categories = ["smartphone", "laptop", "footwear", "tv", "clothes", "watches"];

const Filter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const [filterApplied, setFilterApplied] = useState<boolean>(false);

    const [filters, setFilters] = useState({
        type: "",
        min: "",
        max: "",
        category: "",
        sort: "",
        search: "",
    });

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFilterApplied(true);
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            type: "",
            min: "",
            max: "",
            category: "",
            sort: "",
            search: "",
        });
        setFilterApplied(false);
    }

    
    useEffect(() => {
        
        const applyFilters = debounce(() => {
            const params = new URLSearchParams(searchParams);
            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    params.set(key, value);
                } else {
                    params.delete(key); // Remove empty filters from the URL
                }
            });
            replace(`${pathname}?${params.toString()}`);
        }, 300);
        applyFilters();
        
    }, [filters]);

    return (
        <div className="mt-12 flex flex-col gap-6 font-sans">
            <div className="flex gap-6 flex-wrap">
                <select
                    name="type"
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-violet-100"
                    onChange={handleFilterChange}
                    value={filters.type}
                >
                    <option value="">Type</option>
                    <option value="new arrival">New Arrival</option>
                    <option value="popular">Popular</option>
                </select>
                <input
                    type="number"
                    name="min"
                    placeholder="min price"
                    className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-violet-500"
                    onChange={handleFilterChange}
                    value={filters.min}
                />
                <input
                    type="number"
                    name="max"
                    placeholder="max price"
                    className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-violet-500"
                    onChange={handleFilterChange}
                    value={filters.max}
                />
                <select
                    name="category"
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-violet-100"
                    onChange={handleFilterChange}
                    value={filters.category}
                >
                    <option value="">Category</option>
                    <option value="smartphone">Phone</option>
                    <option value="laptop">Laptop</option>
                    <option value="clothes">Clothes</option>
                    <option value="footwear">Foot wear</option>
                    <option value="tv">TV</option>
                    <option value="watches">Watches</option>

                    {/* <option value="">Category</option>
                    {categories.map((cat)=>(
                        <option key={cat} value={cat}>{capitalizeFirstLetter(cat)}</option>
                    ))} */}
                </select>
                <select
                    name="sort"
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-violet-500"
                    onChange={handleFilterChange}
                    value={filters.sort}
                >
                    <option value="">Sort By</option>
                    <option value="asc price">Price (low to high)</option>
                    <option value="desc price">Price (high to low)</option>
                    <option value="desc lastUpdated">Newest</option>
                    <option value="asc lastUpdated">Oldest</option>
                </select>
                {filterApplied && <button
                    className="text-sm rounded-2xl py-2 px-8 w-max border-none bg-red-500 text-white"
                    onClick={clearFilters}
                >
                    Clear Filter
                </button>}
            </div>
        </div>
    );
};

export default Filter;