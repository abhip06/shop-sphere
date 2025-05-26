"use client"

import { formatPrice } from "@/lib/utils";
import { ProductType } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import AllProductsSkeleton from "./AllProductsSkeleton";
import { toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";
import EditProductModal from "./EditProductModal";
import ConfirmModal from "@/components/ConfirmModal";

const ProductsList = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [products, setProducts] = useState<ProductType[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

    const fetchAllProducts = async () => {
        try {
            const response = await fetch("/api/products?sort=desc+lastUpdated");

            if (!response.ok) {
                setError("Error while fetching all Products");
                return;
            }

            const data = await response.json();
            setProducts(data.products);

        } catch (err) {
            setError("Could not fetch all Products.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (productId: string) => {
        const confirmToProceed = confirm("Are you sure you want to delete the Product?");
        if(!confirmToProceed) return;

        setLoading(true);

        try {
            const response = await fetch(`/api/products/delete/${productId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                toast.error("Error occured while deleting product.");
                return;
            }

            const data = await response.json();

            if (data.success) {
                toast.success(data.message || "Product deleted successfully.");
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.id !== productId)
                );
            } else {
                toast.error(data.error.message || "Error occured while deleting product.");
            }

        } catch (err) {
            toast.error("Something went wrong.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleEditClick = (product: ProductType) => {
        setSelectedProduct(product);
        setEditModalOpen(true);
    };

    const handleSaveProduct = (updatedProduct: ProductType) => {
        setProducts((prevProducts) =>
            prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
    };


    useEffect(() => {
        fetchAllProducts();
    }, []);

    if (loading) {
        return (
            <AllProductsSkeleton />
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center gap-10 w-full">
                {error}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-10 w-full">
            {
                products?.map((product: ProductType) => (
                    <div
                        key={product?.id}
                        className="flex justify-between gap-4 w-full"
                    >
                        <div
                            // onClick={()=>router.push(`/products/${product?.slug}`)}
                            className="flex items-center gap-8"
                        >
                            <Image
                                src={product?.productImages[0]?.url}
                                alt={product?.title}
                                width={85}
                                height={85}
                                className="object-cover rounded-lg h-20"
                            />
                            <div className="flex flex-col justify-between items-start gap-3">
                                <div className="flex justify-between gap-7">
                                    <h3 className="font-semibold text-base sm:text-lg">{product?.title}</h3>
                                    <span className="text-sm sm:text-base">{formatPrice(product?.discountedPrice)}</span>
                                </div>
                                <span className="text-sm text-gray-600">{product?.description}</span>
                            </div>
                        </div>
                        <div className="flex gap-5 text-sm">
                            <span
                                onClick={() => handleEditClick(product)}
                                className="flex gap-1 items-center text-blue-500 hover:text-blue-300 cursor-pointer"
                            >
                                <MdEdit className="text-xl" />
                                Edit
                            </span>
                            <span
                                onClick={() => deleteProduct(product.id ?? "")}
                                className="flex gap-1 items-center text-red-500 hover:text-red-300 cursor-pointer"
                            >
                                <MdDelete className="text-xl" />
                                Delete
                            </span>
                        </div>
                    </div>
                ))
            }
            {editModalOpen && selectedProduct && (
                <EditProductModal
                    product={selectedProduct}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleSaveProduct}
                />
            )}
        </div>
    )
}

export default ProductsList;