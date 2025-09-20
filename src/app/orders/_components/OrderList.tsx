"use client";

import { Order } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoBagHandle } from "react-icons/io5";
import { formatPrice } from "@/lib/utils";

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();
  
  const fetchAllOrders = async () => {
    try {
      const response = await fetch("/api/orders", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data: Order[] = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (!orders.length) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 text-gray-500 w-full min-h-[200px]">
        <IoBagHandle className="text-5xl md:text-8xl" />
        <h2 className="text-lg font-medium">{"You haven't made any order."}</h2>
      </div>
    );
  }

  return (
    <div className="my-12 flex flex-wrap gap-x-8 gap-y-16 items-start">
      {orders.map((order) => (
        <div
          key={order.id}
          className="w-full flex flex-col gap-7 sm:w-[45%] lg:w-[22%] border p-4 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <h3 className="font-semibold text-gray-800">
            Order ID: {order.id}
          </h3>
          <p className="text-sm text-gray-500">
            Status:{" "}
            <span className="font-medium text-violet-500">
              {order.orderStatus}
            </span>
          </p>

          {order.OrderItem.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/products/${item.productId}`)}
              className="flex flex-col gap-4 cursor-pointer"
            >
              <div className="relative w-full h-64">
                {(item.product as any)?.productImages?.[0]?.url && (
                  <Image
                    src={(item.product as any)?.productImages[0].url}
                    alt={item.product?.title}
                    fill
                    sizes="25vw"
                    className="absolute object-cover rounded-md"
                  />
                )}
              </div>

              <span className="font-semibold text-lg text-gray-800">
                {item.product.title}
              </span>

              <div className="flex justify-start items-center gap-3">
                <span className="font-medium text-base text-gray-600">
                  Price: {formatPrice(item.price)}
                </span>
                <span className="text-base text-gray-500">
                  Qty: {item.quantity}
                </span>
              </div>
            </div>
          ))}

          <div className="mt-4 border-t pt-2 text-gray-700">
            <p>Subtotal: {formatPrice(order.subTotal)}</p>
            <p>Delivery: {formatPrice(order.deliveryCharges)}</p>
            <p className="font-bold">
              Total: {formatPrice(order.totalPrice)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
