"use client"

import { useState } from 'react'

const QuantitySelector = ({
    productId,
    stockNumber,
    initialQuantity,
  }: {
    productId: string;
    stockNumber: number;
    initialQuantity: number;
  }) => {

    const [quantity, setQuantity] = useState(initialQuantity);
  const [isLoading, setIsLoading] = useState(false);


  const handleQuantity = (type: "i" | "d") => { // i -> increase & d -> decrease
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-3 rounded-lg flex items-center justify-between w-24">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 && (
            <div className="text-xs">Product is out of stock</div>
          )}
        </div>
  )
}

export default QuantitySelector