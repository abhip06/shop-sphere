import { z } from "zod";

export const addProductValidation = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .min(5, { message: "Title must have more than 5 characters" })
        .max(50, { message: "Title should be less than 50 characters" }),
    description: z
        .string({ required_error: "Description is required" })
        .min(5, { message: "Description must have more than 5 characters" })
        .max(200, { message: "Description should be less than 200 characters" }),
    actualPrice: z
        .number({ required_error: "Actual Price is required" })
        .min(0, "Actual Price should not less than 0"),
    discountedPrice: z
        .number({ required_error: "Discounted Price is required" })
        .min(0, "Discounted Price should not less than 0"),
    discount: z
        .number({ required_error: "Discount is required" })
        .min(0, "Discount should not less than 0"),
    rating: z
        .number({ required_error: "Rating is required" })
        .min(0, "Rating should not less than 0"),
    slug: z
        .string({ required_error: "Slug is required" })
        .min(5, "Slug should not less than 5 characters")
        .max(50, { message: "Slug should be less than 50 characters" }),
    stock: z
        .number({ required_error: "Stock is required" })
        .min(0, "Stock should not less than 0"),
    category: z
        .string({ required_error: "Category is required" })
        .min(5, { message: "Category must have more than 5 characters" })
        .max(50, { message: "Category should be less than 50 characters" }),
});

export const additionalProductInfoValidation = z.array(
    z.object({
        title: z
            .string({ required_error: "Title is required" })
            .min(5, { message: "Title must have more than 5 characters" })
            .max(50, { message: "Title should be less than 50 characters" }),
        description: z
            .string({ required_error: "Description is required" })
            .min(5, { message: "Description must have more than 5 characters" })
            .max(200, { message: "Description should be less than 200 characters" }),
    })
);



export const productImageValidation = z.array(
    z.instanceof(File)
        .refine((file) => {
            return file.size <= 4 * 1024 * 1024; // 4MB
        }, { message: "File size must be less than 5MB", })
        .refine((file) => {
            // Validate file type (e.g., images only)
            return file.type.startsWith("image/");
        }, { message: "Only image files are allowed (png, jpg, jpeg, gif)." })
).refine((files) => {
    // Validate minimum and maximum number of files
    return files.length >= 1 && files.length <= 10; // Allow 1 to 10 files
}, { message: "You must upload between 1 and 10 files." });

export const addProductFrontendValidation = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .min(5, { message: "Title must have more than 5 characters" })
        .max(50, { message: "Title should be less than 50 characters" }),
    description: z
        .string({ required_error: "Description is required" })
        .min(5, { message: "Description must have more than 5 characters" })
        .max(200, { message: "Description should be less than 200 characters" }),
    actualPrice: z
        .number({ required_error: "Actual Price is required" })
        .min(0, "Actual Price should not less than 0"),
    discountedPrice: z
        .number({ required_error: "Discounted Price is required" })
        .min(0, "Discounted Price should not less than 0"),
    discount: z
        .number({ required_error: "Discount is required" })
        .min(0, "Discount should not less than 0"),
    rating: z
        .number({ required_error: "Rating is required" })
        .max(5, "Rating should not more than 5")
        .min(0, "Rating should not less than 0")
        .optional(),
    slug: z
        .string({ required_error: "Slug is required" })
        .min(5, "Slug should not less than 5 characters")
        .max(50, { message: "Slug should be less than 50 characters" }),
    stock: z
        .number({ required_error: "Stock is required" })
        .min(0, "Stock should not less than 0"),
    category: z
        .string({ required_error: "Category is required" })
        .min(5, { message: "Category must have more than 5 characters" })
        .max(50, { message: "Category should be less than 50 characters" }),
    additionalProductInfo: z.array(
        z.object({
            title: z
                .string({ required_error: "Title is required" })
                .min(5, { message: "Title must have more than 5 characters" })
                .max(50, { message: "Title should be less than 50 characters" }),
            description: z
                .string({ required_error: "Description is required" })
                .min(5, { message: "Description must have more than 5 characters" })
                .max(200, { message: "Description should be less than 200 characters" }),
        })
    ),
    productImages: productImageValidation,
});

export const basicInfoValidation = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .min(5, { message: "Title must have more than 5 characters" })
        .max(50, { message: "Title should be less than 50 characters" }),
    description: z
        .string({ required_error: "Description is required" })
        .min(5, { message: "Description must have more than 5 characters" })
        .max(200, { message: "Description should be less than 200 characters" }),
    actualPrice: z
        .number({ required_error: "Actual Price is required" })
        .min(0, "Actual Price should not less than 0"),
    discountedPrice: z
        .number({ required_error: "Discounted Price is required" })
        .min(0, "Discounted Price should not less than 0"),
    discount: z
        .number({ required_error: "Discount is required" })
        .min(0, "Discount should not less than 0"),
    rating: z
        .number({ required_error: "Rating is required" })
        .min(0, "Rating should not less than 0")
        .optional(),
    slug: z
        .string({ required_error: "Slug is required" })
        .min(5, "Slug should not less than 5 characters")
        .max(50, { message: "Slug should be less than 50 characters" }),
    stock: z
        .number({ required_error: "Stock is required" })
        .min(0, "Stock should not less than 0"),
    category: z
        .string({ required_error: "Category is required" })
        .min(5, { message: "Category must have more than 5 characters" })
        .max(50, { message: "Category should be less than 50 characters" }),
});

// OR

// const additionalProductInfoSchema = z.object({
//     title: z
//         .string({ required_error: "Title is required" })
//         .min(5, { message: "Title must have more than 5 characters" })
//         .max(50, { message: "Title should be less than 50 characters" }),
//     description: z
//         .string({ required_error: "Description is required" })
//         .min(5, { message: "Description must have more than 5 characters" })
//         .max(200, { message: "Description should be less than 200 characters" }),
// });
// export const additionalProductInfoValidation = z.array(additionalProductInfoSchema);