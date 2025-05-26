"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductType } from "@/types/types";
import { MdClose } from "react-icons/md";
import { FaImage, FaTrash } from "react-icons/fa6";
import Image from "next/image";
import { z } from "zod";
import { addProductValidation } from "@/validations/addProduct.validation";

interface EditProductModalProps {
    product: ProductType;
    onClose: () => void;
    onSave: (updatedProduct: ProductType) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose, onSave }) => {
    const [updatedProduct, setUpdatedProduct] = useState<ProductType>(product);
    const [loading, setLoading] = useState<boolean>(false);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [validationIssue, setValidationIssue] = useState<z.ZodFormattedError<
        z.infer<typeof addProductValidation>,
        string
    > | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleSaveChanges = async () => {

        setLoading(true);

        try {

            const validateData = addProductValidation.safeParse({ updatedProduct });

            if (!validateData.success) {
                setValidationIssue(validateData.error.format());
                return;
            }

            const response = await fetch(`/api/products/update-product/${updatedProduct.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...updatedProduct, removedImages, newImages }),
            });

            if (response.ok) {
                toast.error("Failed to Edit the product.");
                return;
            }

            const data = await response.json();
            if (data.success) {
                toast.success("Product Modified successfully.");
                onSave(updatedProduct);
                onClose();
            } else {
                toast.error(data.message || "Error occurred while updating the product.");
            }
        } catch (err) {
            toast.error("Something went wrong.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdditionalInfoChange = (index: number, field: 'title' | 'description', value: string) => {
        const updatedInfo = updatedProduct.additionalProductInfo.map((info, idx) => {
            if (idx === index) {
                return { ...info, [field]: value };
            }
            return info;
        });

        setUpdatedProduct((prev) => ({
            ...prev,
            additionalProductInfo: updatedInfo,
        }));
    };


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setNewImages(filesArray);
            // Generate image previews
            const previews = filesArray.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const handleRemoveImage = (imageUrl: string) => {
        setRemovedImages([...removedImages, imageUrl]);
        setUpdatedProduct({
            ...updatedProduct,
            productImages: updatedProduct.productImages.filter((img) => img.url !== imageUrl),
        });
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
            // Revoke object URLs to avoid memory leaks
            imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imagePreviews]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="h-5/6 overflow-y-scroll bg-gray-800 text-white w-full max-w-lg p-10 rounded-lg shadow-lg">
                <button onClick={onClose} className="mb-8">
                    <MdClose className="text-4xl" />
                </button>
                <h2 className="text-2xl font-medium mb-8">Edit Product</h2>
                <div className="flex flex-col gap-8">
                    {/* IMAGE UPLOAD */}
                    <div className="flex gap-4 flex-wrap">
                        {updatedProduct.productImages.map((img, index) => (
                            <div key={index} className="relative w-28 h-28">
                                <Image
                                    src={img.url}
                                    alt="Product"
                                    width={50}
                                    height={50}
                                    className="object-cover w-full h-full rounded"
                                />
                                <button
                                    className="absolute top-1 right-1 text-white"
                                    onClick={() => handleRemoveImage(img.url)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        {imagePreviews.map((preview, index) => (
                            <div key={`preview-${index}`} className="relative w-24 h-24">
                                <img src={preview} alt="New Product" className="object-cover w-full h-full rounded" />
                                <button
                                    className="absolute top-1 right-1 text-white"
                                    onClick={() => {
                                        const updatedPreviews = [...imagePreviews];
                                        updatedPreviews.splice(index, 1);
                                        setImagePreviews(updatedPreviews);
                                        const updatedFiles = [...newImages];
                                        updatedFiles.splice(index, 1);
                                        setNewImages(updatedFiles);
                                    }}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    < div className="flex flex-col w-full" >
                        <label className="w-full h-60 text-gray-400 flex flex-col gap-4 items-center justify-center border-2 border-dashed border-violet-500 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                            <FaImage className="text-5xl" />
                            <span className="">Click to Upload Images</span>
                            <input
                                type="file"
                                multiple
                                accept="image/jpg, image/jpeg, image/png"
                                name="productImages"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {/* Form Fields for Product Details */}
                    <div className="flex flex-col gap-2">
                        <label className={`text-sm ${validationIssue?.title ? "text-red-500" : "text-violet-500"}`}>Title</label>
                        {validationIssue?.title && (
                            <div className="flex flex-col gap-3">
                                {validationIssue?.title?._errors?.map((err, index) => (
                                    <p
                                        key={index}
                                        className="text-red-500 text-sm"
                                    >
                                        {err}
                                    </p>
                                ))}
                            </div>
                        )}
                        <input
                            type="text"
                            name="title"
                            value={updatedProduct.title}
                            onChange={handleInputChange}
                            placeholder="Enter Product Title"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent ${validationIssue?.title ? "ring-red-500" : "ring-violet-500"}`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={`text-sm ${validationIssue?.description ? "text-red-500" : "text-violet-500"}`}>Description</label>
                        {validationIssue?.description && (
                            <div className="flex flex-col gap-3">
                                {validationIssue?.description?._errors?.map((err, index) => (
                                    <p
                                        key={index}
                                        className="text-red-500 text-sm"
                                    >
                                        {err}
                                    </p>
                                ))}
                            </div>
                        )}
                        <textarea
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleInputChange}
                            placeholder="Enter Product Title"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent ${validationIssue?.description ? "ring-red-500" : "ring-violet-500"}`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={`text-sm ${validationIssue?.actualPrice ? "text-red-500" : "text-violet-500"}`}>Actual Price</label>
                        {validationIssue?.actualPrice && (
                            <div className="flex flex-col gap-">
                                {validationIssue?.actualPrice?._errors?.map((err, index) => (
                                    <p
                                        key={index}
                                        className="text-red-500 text-sm"
                                    >
                                        {err}
                                    </p>
                                ))}
                            </div>
                        )}
                        <input
                            type="number"
                            name="actualPrice"
                            value={updatedProduct.actualPrice}
                            onChange={handleInputChange}
                            placeholder="Enter Product Actual Price"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent [appearance:textfield] ${validationIssue?.actualPrice ? "ring-red-500" : "ring-violet-500"}`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={`text-sm ${validationIssue?.discount ? "text-red-500" : "text-violet-500"}`}>Discount</label>
                        {validationIssue?.discount && (
                            <div className="flex flex-col gap-">
                                {validationIssue?.discount?._errors?.map((err, index) => (
                                    <p
                                        key={index}
                                        className="text-red-500 text-sm"
                                    >
                                        {err}
                                    </p>
                                ))}
                            </div>
                        )}
                        <input
                            type="number"
                            name="discount"
                            value={updatedProduct.discount}
                            onChange={handleInputChange}
                            placeholder="Enter Product Discount"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent [appearance:textfield] ${validationIssue?.discount ? "ring-red-500" : "ring-violet-500"}`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={`text-sm ${validationIssue?.discountedPrice ? "text-red-500" : "text-violet-500"}`}>Discounted Price</label>
                        {validationIssue?.discountedPrice && (
                            <div className="flex flex-col gap-">
                                {validationIssue?.discountedPrice?._errors?.map((err, index) => (
                                    <p
                                        key={index}
                                        className="text-red-500 text-sm"
                                    >
                                        {err}
                                    </p>
                                ))}
                            </div>
                        )}
                        <input
                            type="number"
                            name="discountedPrice"
                            value={updatedProduct.discountedPrice}
                            onChange={handleInputChange}
                            placeholder="Enter Product Discounted Price"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent [appearance:textfield] ${validationIssue?.discountedPrice ? "ring-red-500" : "ring-violet-500"}`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={`text-sm ${validationIssue?.slug ? "text-red-500" : "text-violet-500"}`}>Slug</label>
                        {validationIssue?.slug && (
                            <div className="flex flex-col gap-">
                                {validationIssue?.slug?._errors?.map((err, index) => (
                                    <p
                                        key={index}
                                        className="text-red-500 text-sm"
                                    >
                                        {err}
                                    </p>
                                ))}
                            </div>
                        )}
                        <input
                            type="text"
                            name="slug"
                            value={updatedProduct.slug}
                            onChange={handleInputChange}
                            placeholder="Enter Product Slug"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent ${validationIssue?.slug ? "ring-red-500" : "ring-violet-500"}`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={`text-sm ${validationIssue?.stock ? "text-red-500" : "text-violet-500"}`}>Stock</label>
                        {validationIssue?.stock && (
                            <div className="flex flex-col gap-">
                                {validationIssue?.stock?._errors?.map((err, index) => (
                                    <p
                                        key={index}
                                        className="text-red-500 text-sm"
                                    >
                                        {err}
                                    </p>
                                ))}
                            </div>
                        )}
                        <input
                            type="text"
                            name="stock"
                            value={updatedProduct.stock}
                            onChange={handleInputChange}
                            placeholder="Enter Product Stock"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent ${validationIssue?.stock ? "ring-red-500" : "ring-violet-500"}`}
                        />
                    </div>
                    <h3 className="text-xl mt-5">Additional Product Info</h3>
                    {updatedProduct.additionalProductInfo.map((info, index) => (
                        <div
                            key={info.id}
                            className="flex flex-col gap-8"
                        >
                            <div className="flex flex-col gap-2">
                                <label className={`text-sm ${validationIssue?.title ? "text-red-500" : "text-violet-500"}`}>Title</label>
                                {validationIssue?.title && (
                                    <div className="flex flex-col gap-3">
                                        {validationIssue?.title?._errors?.map((err, index) => (
                                            <p
                                                key={index}
                                                className="text-red-500 text-sm"
                                            >
                                                {err}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                <input
                                    type="text"
                                    name="title"
                                    value={info.title}
                                    onChange={(e)=>handleAdditionalInfoChange(index, "title", e.target.value)}
                                    placeholder="Enter Product Title"
                                    className={`relative ring-1 rounded-md p-4 outline-none bg-transparent ${validationIssue?.title ? "ring-red-500" : "ring-violet-500"}`}
                                />
                            </div >

                            <div className="flex flex-col gap-2">
                                <label className={`text-sm ${validationIssue?.description ? "text-red-500" : "text-violet-500"}`}>Description</label>
                                {validationIssue?.description && (
                                    <div className="flex flex-col gap-3">
                                        {validationIssue?.description?._errors?.map((err, index) => (
                                            <p
                                                key={index}
                                                className="text-red-500 text-sm"
                                            >
                                                {err}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                <textarea
                                    name="description"
                                    value={info.description}
                                    onChange={(e)=>handleAdditionalInfoChange(index, "description", e.target.value)}
                                    placeholder="Enter Product Title"
                                    className={`relative ring-1 rounded-md p-4 outline-none bg-transparent ${validationIssue?.description ? "ring-red-500" : "ring-violet-500"}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => console.log({ ...updatedProduct, removedImages })}
                    // onClick={handleSaveChanges}
                    disabled={loading}
                    className={`bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""} mt-10`}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div >
    );
};

export default EditProductModal;
