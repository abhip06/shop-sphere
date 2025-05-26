"use client"

import { Suspense, useEffect, useState } from 'react'
import Skeleton from './Skeleton';
import ProductCard from './ProductCard';

const NewArrivalList = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/products?sort=desc+lastUpdated&limit=4");
            const data = await response.json();

            setProducts(data.products);

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <>
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

export default NewArrivalList;