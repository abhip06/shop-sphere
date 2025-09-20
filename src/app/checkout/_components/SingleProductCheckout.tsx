"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image";
import { ProductType } from "@/types/types";
import { formatPrice } from "@/lib/utils";
import CheckoutSkeletonLoader from "./CheckoutSkeletonLoader";
import { authStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface OrderItemType {
  id?: number;
  productId: string;
  quantity: number;
  price: number;
}

interface OrderDataType {
  subTotal: number;
  taxPrice: number;
  deliveryCharges: number;
  totalPrice: number;
  quantity: number;
  addressId: number;
  products: OrderItemType[];
  paymentStatus: "UNPAID" | "PAID";
}

const SingleProductCheckout = ({
  productId,
  quantity
}: {
  productId: string;
  quantity: number;
}) => {

  const { authStatus, user, hydrated } = authStore();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [product, setProduct] = useState<ProductType | null>(null);

  const productPrice = useMemo(() => product ? product.discountedPrice * quantity : 0, [product, quantity]);
  const taxPrice = useMemo(() => productPrice * 0.005, [productPrice]);
  const shippingCharges = 25;
  const totalPrice = useMemo(() => productPrice + taxPrice + shippingCharges, [productPrice, taxPrice]);

  const fetchProductInfo = async () => {
    setError("");

    try {
      const response = await fetch(`/api/products/get-product/${productId}`);
      if (!response.ok) {
        throw new Error("Error occurred while fetching product info.");
      }

      const data = await response.json();
      setProduct(data.product);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  const handlePlaceOrder = async () => {
    setLoading(true);

    const orderData: OrderDataType = {
      subTotal: productPrice,
      taxPrice,
      totalPrice,
      deliveryCharges: shippingCharges,
      quantity: Number(quantity),
      addressId: 1,
      products: [{
          productId,
          quantity: Number(quantity),
          price: product!.discountedPrice
        }],
        paymentStatus: "UNPAID"
    }

    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData)
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Order placed successfully!");
        router.push(`/orders/${responseData?.order?.id}`); // Redirect to success page
      } else {
        toast.error(responseData.error.message || "Failed to place order.");
      }

    } catch (err) {
      toast.error("Something went wrong while placing the order.");
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!hydrated) return;
    if (!authStatus || !user) {
      router.push("/sign-in");
      return;
    }

    fetchProductInfo();
  }, [productId, hydrated, authStatus, user]);

  if (loading) {
    return <CheckoutSkeletonLoader />
  }

  return (
    <div className={`flex justify-between items-start gap-10 md:gap-20 lg:gap-28 xl:gap-40 flex-col md:flex-row`}>
      {error ? (
        <div className="flex items-center justify-center">
          <h2 className="text-xl font-medium text-gray-500">{error}</h2>
          <button onClick={fetchProductInfo} className="text-blue-500 underline">
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-1 flex-col gap-8 w-full">
            <h2 className="text-2xl font-semibold">Checkout</h2>
            <div
              // onClick={() => router.push(`products/${item.slug}`)}
              className="flex flex-col gap-4 cursor-pointer"
            >
              <Image
                src={product?.productImages[0]?.url ?? ""}
                alt={product?.title ?? ""}
                width={100}
                height={100}
                className="object-cover rounded-lg w-1/2"
              />
              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col justify-between items-start gap-3">
                  <h3 className="font-semibold text-base sm:text-lg">{product?.title}</h3>
                  <span className="text-sm sm:text-base">{formatPrice(product?.discountedPrice ?? 0)}</span>
                  {/* <span className="text-sm text-gray-600">{item?.description}</span> */}
                  <span className="text-sm text-gray-500 font-semibold">Qty. {quantity}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-7 bg-violet-50 p-6 sm:p-10 rounded-md w-full">
            <h2 className="text-2xl text-gray-800">Order Summary</h2>
            <div className="flex items-center justify-between text-gray-800 text-sm sm:text-base">
              <span className="font-medium">Subtotal</span>
              <span className="font-normal">{formatPrice(productPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-800 text-sm sm:text-base">
              <span className="font-medium">Tax (+5% GST)</span>
              <span className="font-normal">{formatPrice(taxPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-800 text-sm sm:text-base">
              <span className="font-medium">Shipping Charges</span>
              <span className="font-normal">{formatPrice(shippingCharges)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-800 text-sm sm:text-base">
              <span className="font-medium">Total</span>
              <span className="font-normal">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-start justify-between text-gray-800 text-sm sm:text-base">
              <span className="font-medium">Shipping Address</span>
              <div className="flex flex-col justify-center items-end gap-2 w-1/2 sm:w-1/3">
                <span className="font-normal">Subhash Bhavan, Tikla road, Vaishali Nagar, New Delhi, IN.</span>
                <span className="font-normal text-sm text-blue-500 cursor-pointer">Change Address</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="mt-4 w-full sm:w-32 bg-violet-500 text-white rounded-lg cursor-pointer ring-1 hover:ring-violet-500 py-2 px-4 hover:bg-transparent hover:text-violet-500 disabled:bg-violet-200 disabled:cursor-not-allowed disabled:ring-0 disabled:text-white disabled:ring-none"
            >
              Place Order
            </button>
          </div>
        </>
      )
      }
    </div >
  )
}

export default SingleProductCheckout;