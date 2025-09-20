"use client"

import { additionalProductInfoValidation } from '@/validations/addProduct.validation';
import React from 'react'
import { z } from 'zod';

// interface ValidationIssue {
//     title?: { _errors: string[] }; // Assuming _errors is an array of strings
//     description?: { _errors: string[] }; // Same for description
//   }

type AdditionalInfoFormDataType = z.infer<typeof additionalProductInfoValidation>;


interface AdditionalInfo {
    title: string;
    description: string;
}

const AdditionalProductInfo = React.memo(
    ({
        fields,
        setFields,
        onInputChange,
        validationIssue
    }: {
        fields: AdditionalInfo[];
        setFields: React.Dispatch<React.SetStateAction<AdditionalInfo[]>>;
        onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
        validationIssue: z.ZodFormattedError<AdditionalInfoFormDataType, string> | null;
    }) => {

        // Add new set of fields when clicking the button
        const addMoreFields = () => {
            setFields([...fields, { title: "", description: "" }]);
        };

        // Remove fields
        const removeField = (index: number) => {
            setFields(fields.filter((_, i) => i !== index));
        };

        return (
            <div className="flex flex-col gap-7 w-full max-w-full md:w-3/4 lg:w-2/3">
                <h2 className="text-2xl font-medium">Additional Product Info</h2>
                {fields.map((field, index) => (
                    <div key={index} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className={`text-sm ${validationIssue?.[index]?.title ? "text-red-500" : "text-violet-500"}`}>Title</label>
                            {validationIssue?.[index]?.title && (
                                <div className="flex flex-col gap-3">
                                    {validationIssue?.[index]?.title?._errors?.map((err, i) => (
                                        <p
                                            key={i}
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
                                value={field?.title}
                                required
                                onChange={(e) => onInputChange(e, index)}
                                placeholder="Enter Product Title"
                                className={`relative ring-1 rounded-md p-4 outline-none bg-transparent ${validationIssue?.[index]?.title ? "ring-red-500" : "ring-violet-500"}`}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className={`text-sm ${validationIssue?.[index]?.description ? "text-red-500" : "text-violet-500"}`}>Description</label>
                            {validationIssue?.[index]?.description && (
                                <div className="flex flex-col gap-3">
                                    {validationIssue?.[index]?.description?._errors?.map((err, i) => (
                                        <p
                                            key={i}
                                            className="text-red-500 text-sm"
                                        >
                                            {err}
                                        </p>
                                    ))}
                                </div>
                            )}
                            <textarea
                                name="description"
                                value={field?.description}
                                required
                                rows={5}
                                onChange={(e) => onInputChange(e, index)}
                                placeholder="Enter Product Title"
                                className={`relative ring-1 rounded-md p-4 outline-none bg-transparent ${validationIssue?.[index]?.description ? "ring-red-500" : "ring-violet-500"}`}
                            />
                        </div>
                        {fields.length > 1 && (
                            <button
                                onClick={() => removeField(index)}
                                className="text-sm text-red-400 w-max"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}

                <span
                    onClick={addMoreFields}
                    className="text-sm text-gray-400 cursor-pointer w-max"
                >
                    Add more+
                </span>
            </div>
        )
    })

AdditionalProductInfo.displayName = "AdditionalProductInfo";

export default AdditionalProductInfo