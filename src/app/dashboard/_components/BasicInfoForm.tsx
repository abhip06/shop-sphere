"use client"

import { basicInfoValidation } from '@/validations/addProduct.validation';
import { z } from "zod";

type BasicInfoFormDataType = z.infer<typeof basicInfoValidation>;

const BasicInfoForm = ({
    formData,
    onInputChange,
    validationIssue
} : {
    formData: any; 
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
    validationIssue: z.ZodFormattedError<BasicInfoFormDataType, string> | null; 
}) => {

    return (
        <div className="flex flex-col gap-8 w-full max-w-full md:w-3/4 lg:w-2/3">
            <h2 className="text-2xl font-medium">Basic Info</h2>
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
                    value={formData.title}
                    onChange={onInputChange}
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
                    value={formData.description}
                    onChange={onInputChange}
                    rows={5}
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
                    value={formData.actualPrice}
                    onChange={onInputChange}
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
                    value={formData.discount}
                    onChange={onInputChange}
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
                    value={formData.discountedPrice}
                    onChange={onInputChange}
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
                    value={formData.slug}
                    onChange={onInputChange}
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
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={onInputChange}
                    placeholder="Enter Product Stock"
                    className={`relative ring-1 rounded-md p-4 outline-none bg-transparent ${validationIssue?.stock ? "ring-red-500" : "ring-violet-500"}`}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className={`text-sm ${validationIssue?.category ? "text-red-500" : "text-violet-500"}`}>Category</label>
                {validationIssue?.category && (
                    <div className="flex flex-col gap-">
                        {validationIssue?.category?._errors?.map((err, index) => (
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
                    name="category"
                    value={formData.category}
                    onChange={onInputChange}
                    placeholder="Enter Product Category"
                    className={`relative ring-1 rounded-md p-4 outline-none bg-transparent ${validationIssue?.category ? "ring-red-500" : "ring-violet-500"}`}
                />
            </div>
        </div>
    )
}

export default BasicInfoForm