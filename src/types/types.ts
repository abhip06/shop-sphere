
// User type
interface UserAddressInfo {
    id?: number;
    line1: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
}

export interface UserType {
    id?: string;
    fullName: string;
    username: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    role: "CUSTOMER" | "ADMIN";
    address?: UserAddressInfo[];
}

// Product Types
interface ProductImages {
    id?: number;
    url: string;
}

interface AdditionalInfoSection {
    id?: number;
    title: string;
    description: string;
}

// Product Type
export interface ProductType {
    id?: string;
    title: string;
    description: string;
    actualPrice: number;
    discount: number;
    discountedPrice: number;
    rating: number;
    slug: string;
    productImages: ProductImages[];
    additionalProductInfo: AdditionalInfoSection[];
    category: string;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface OrderItemType {
    id: number;
    orderId?: string;
    productId?: string;
    quantity: number;
    price: number;
    product: {
        title: string;
    };
}

// Orders Type
export interface Order {
    id?: string;
    subTotal: number;
    taxPrice: number;
    deliveryCharges: number;
    totalPrice: number;
    quantity: number;
    shippingAddress: UserAddressInfo;
    customer: UserType;
    OrderItem: OrderItemType[];
    paymentStatus: "UNPAID" | "PAID";
    orderStatus: "IN PROGRESS" | "OUT FOR DELIVERY" | "DELIVERED";
    createdAt?: Date;
    updatedAt?: Date;
}