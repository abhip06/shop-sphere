"use client"

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

import { FaImage } from "react-icons/fa6"
import { z } from "zod";

interface PreviewImage {
    file: File;
    src: string;
    index: number;
}

interface IFormData {
    title: string;
    description: string;
    actualPrice: number;
    discount: number;
    discountedPrice: number;
    slug: string;
    stock: number;
    category: string;
    additionalProductInfo: {
        title: string;
        description: string;
    }[];
    productImages: File[],
}

const UploadImage = ({
    setFormData,
    validationIssue
}: {
    setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
    validationIssue: z.ZodFormattedError<File[], string> | null;
}) => {
    const [previews, setPreviews] = useState<PreviewImage[]>([]);

    // Handle file change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const newImages = files.map((file, index) => ({
            file,
            src: URL.createObjectURL(file),
            index: previews.length + index // Maintain unique index
        }));

        // Update both images state and formData
        setPreviews(prev => [...prev, ...newImages]);
        setFormData(prev => ({
            ...prev,
            productImages: [...prev.productImages, ...files]
        }));
    };

    // Revoke object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            previews.forEach(image => URL.revokeObjectURL(image.src));
        };
    }, [previews]);

    // Handle removing an image
    const handleRemovePreview = (index: number) => {
        const updatedImages = previews.filter(image => image.index !== index);
        const updatedFiles = updatedImages.map(image => image.file);

        setPreviews(updatedImages);
        setFormData(prev => ({
            ...prev,
            productImages: updatedFiles
        }));
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-full md:w-3/4 lg:w-2/3">
            <h2 className="text-2xl font-medium">Upload Product Image</h2>
            < div className="flex flex-col w-full" >
                <label className="w-full h-60 text-gray-400 flex flex-col gap-4 items-center justify-center border-2 border-dashed border-violet-500 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                    <FaImage className="text-5xl" />
                    <span className="">Click to Upload Images</span>
                    <input
                        type="file"
                        multiple
                        accept="image/jpg, image/jpeg, image/png"
                        name="productImages"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {validationIssue && (
                    <div className="flex flex-col gap-3">
                        {validationIssue?._errors?.map((err, index) => (
                            <p
                                key={index}
                                className="text-red-500 text-sm"
                            >
                                {err}
                            </p>
                        ))}
                    </div>
                )}

                {/* Previews */}
                {previews.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-5">
                        {previews.map(({ src, index }) => (
                            <div key={index} className="relative w-32 h-32">
                                <Image
                                    src={src}
                                    alt={`Preview ${index}`}
                                    width={50}
                                    height={50}
                                    className="w-full h-full object-cover rounded-lg shadow-md"
                                />

                                <button
                                    onClick={() => handleRemovePreview(index)}
                                    className="absolute top-2 right-2 bg-violet-500 text-white rounded-full p-2 text-xs hover:bg-violet-700"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UploadImage