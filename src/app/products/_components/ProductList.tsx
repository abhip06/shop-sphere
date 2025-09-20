"use client"

import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import ProductCard from '../../../components/ProductCard';
import Skeleton from '../../../components/Skeleton';
import { useSearchParams } from 'next/navigation';
import Filter from './Filter';

const ProductList = () => {

    const searchParams = useSearchParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    // Extract search query and filters from URL parameters
    let searchQuery = searchParams.get("search") || "";

    // Memoize filterParams to prevent unnecessary re-renders
    const filterParams = useMemo(() => ({
        type: searchParams.get("type") || "",
        minPrice: searchParams.get("min") || "",
        maxPrice: searchParams.get("max") || "",
        category: searchParams.get("category") || "",
        sort: searchParams.get("sort") || "",
    }), [searchParams]);

    // Fetch products based on search or filter
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            let url = "/api/products";

            const queryParams = new URLSearchParams();
            if (searchQuery) queryParams.append("search", searchQuery);
            if (filterParams.type) queryParams.append("type", filterParams.type);
            if (filterParams.minPrice) queryParams.append("min", filterParams.minPrice);
            if (filterParams.maxPrice) queryParams.append("max", filterParams.maxPrice);
            if (filterParams.category) queryParams.append("category", filterParams.category);
            if (filterParams.sort) queryParams.append("sort", filterParams.sort);

            if (queryParams.toString()) {
                url += `?${queryParams.toString()}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            setProducts(data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, filterParams]);

    // Fetch products when search query or filter parameters change
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <>
            {/* FILTER */}
            <Filter />

            {/* {searchQuery.length || Object.values(filterParams).some((val) => val) ? <h1 className="mt-12 text-xl font-semibold">{`(${products.length})`} Search Results For: {searchQuery}</h1>
                : <h1 className="mt-12 text-xl font-semibold">Products For You!</h1>} */}

            {loading ? (
                <Skeleton />
            ) : (
                <Suspense fallback={<Skeleton />}>
                    <ProductCard products={products} />
                </Suspense>
            )}
        </>
    )
}

export default ProductList;