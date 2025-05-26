"use client"

import BtnLoader from '@/components/BtnLoader'
import { additionalProductInfoValidation, basicInfoValidation, productImageValidation } from '@/validations/addProduct.validation';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { z } from 'zod';
import AdditionalProductInfo from './AdditionalProductInfo';
import UploadImage from './UploadImage';
import BasicInfoForm from './BasicInfoForm';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

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

type ValidationIssues = {
    basicInfo?: z.ZodFormattedError<z.infer<typeof basicInfoValidation>, string>;
    additionalProductInfo?: z.ZodFormattedError<z.infer<typeof additionalProductInfoValidation>, string>;
    productImages?: z.ZodFormattedError<z.infer<typeof productImageValidation>, string>;
};

interface AdditionalInfo {
    title: string;
    description: string;
}


const AddProductForm = () => {

    const router = useRouter();

    const [fields, setFields] = useState<AdditionalInfo[]>([
        { title: "", description: "" }
    ]);
    // Form data state for all steps
    const [formData, setFormData] = useState<IFormData>({
        title: "",
        description: "",
        actualPrice: 0,
        discount: 0,
        discountedPrice: 0,
        slug: "",
        stock: 0,
        category: "",
        additionalProductInfo: fields,
        productImages: [],
    });

    const [loading, setLoading] = useState(false);
    const [validationIssue, setValidationIssue] = useState<ValidationIssues>({});

    // State to manage the current step of the form
    const [step, setStep] = useState<number>(0);

    // Array of steps (for the progress bar and form navigation)
    const steps = ['Basic Info', 'Additional Info', 'Upload Product Images'];


    // Handle field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        const { name, value } = e.target;
        const isNumberField = ["actualPrice", "discountedPrice", "discount", "stock"].includes(name);
        const processedValue = isNumberField ? Number(value) : value;


        if (step === 1) {
            setFields((prev) => {
                const updatedFields = [...prev];
                updatedFields[index!] = { ...updatedFields[index!], [name]: processedValue };
                setFormData((prevData) => ({
                    ...prevData,
                    additionalProductInfo: updatedFields,
                }));
                return updatedFields;
            });
        } else if (step === 0) {
            setFormData({ ...formData, [name]: processedValue });
        }
    };

    const validateCurrentStep = () => {
        let result: z.SafeParseReturnType<any, any>;
        switch (step) {
            case 0:
                result = basicInfoValidation.safeParse(formData);
                if (!result.success && result.error) {
                    setValidationIssue((prev) => ({
                        ...prev,
                        basicInfo: result.error!.format(),
                    }));
                    return false;
                }
                break;
            case 1:
                result = additionalProductInfoValidation.safeParse(fields);
                if (!result.success && result.error) {
                    setValidationIssue((prev) => ({
                        ...prev,
                        additionalProductInfo: result.error!.format(),
                    }));
                    return false;
                }
                break;
            case 2:
                result = productImageValidation.safeParse(formData.productImages);
                if (!result.success && result.error) {
                    setValidationIssue((prev) => ({
                        ...prev,
                        productImages: result.error!.format(),
                    }));
                    return false;
                }
                break;
            default:
                return false;
        }

        // If validation passes, clear the validationIssue for the current step
        setValidationIssue((prev) => ({
            ...prev,
            basicInfo: step === 0 ? undefined : prev.basicInfo,
            additionalInfo: step === 1 ? undefined : prev.additionalProductInfo,
            productImages: step === 2 ? undefined : prev.productImages,
        }));

        return true;
    };

    // Handle next step
    const handleNext = () => {
        if (validateCurrentStep()) {
            setStep((prev) => Math.min(prev + 1, 2));
        }
    };

    // Handle previous step
    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 0));
    };

    // Handle form submission (validation and then API call)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateCurrentStep()) return;

        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("actualPrice", formData.actualPrice.toString());
            formDataToSend.append("discount", formData.discount.toString());
            formDataToSend.append("discountedPrice", formData.discountedPrice.toString());
            formDataToSend.append("slug", formData.slug);
            formDataToSend.append("stock", formData.stock.toString());
            formDataToSend.append("category", formData.category);

            // Append additional product info
            formDataToSend.append("additionalProductInfo", JSON.stringify(formData.additionalProductInfo));

            // Append each file in productImages
            formData.productImages.forEach((file) => {
                formDataToSend.append(`productImages`, file);
            });

            const response = await fetch("/api/products/add-product", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(data?.message);
                return;
            }

            if (data.success) {
                toast.success("Product added successfully.");
                router.push(`/products/${data?.product?.slug}`);
                return;
            }
        } catch (error) {
            console.log("Error occurred while Adding a new Product.", error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    // Render the current step component
    const renderStep = () => {
        switch (step) {
            case 0:
                return <BasicInfoForm formData={formData} onInputChange={handleInputChange} validationIssue={validationIssue.basicInfo ?? null} />;
            case 1:
                return <AdditionalProductInfo
                    fields={fields}
                    setFields={setFields}
                    onInputChange={handleInputChange}
                    validationIssue={validationIssue.additionalProductInfo ?? null}
                />;
            case 2:
                return <UploadImage setFormData={setFormData} validationIssue={validationIssue.productImages ?? null} />;
            default:
                return <div>Unknown step</div>;
        }
    };

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className={`flex flex-col justify-center items-center gap-8 w-full`}>
            {/* Progress Bar */}
            <div className="w-full mb-8">
                <div className="flex justify-between mb-2">
                    {steps.map((label, index) => (
                        <span
                            key={index}
                            className={`text-base font-medium ${index <= step ? 'text-violet-500' : 'text-gray-400'}`}
                        >
                            {label}
                        </span>
                    ))}
                </div>
                <div className="w-full bg-gray-200 rounded-lg h-3">
                    <div
                        className="bg-violet-500 h-3 rounded-lg"
                        style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Form Steps */}
            <form encType="multipart/form-data" className="w-full flex justify-center items-center">
                {renderStep()}
            </form>

            {/* Navigation Buttons */}
            <div className=" w-full max-w-full md:w-3/4 lg:w-2/3 flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white py-3 px-5 rounded-md w-max disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-600"
                    disabled={step === 0}
                >
                    Back
                </button>
                {step < steps.length - 1 && (
                    <button
                        onClick={handleNext}
                        className="bg-gray-500 text-white py-3 px-5 rounded-md w-max"
                        disabled={loading}
                    >
                        Next
                    </button>
                )}
                {step === steps.length - 1 && (
                    <button
                        onClick={handleSubmit}
                        className="bg-violet-500 text-white py-3 px-5 rounded-md w-max"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    )
}

export default AddProductForm;