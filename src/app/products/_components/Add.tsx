"use client";

import { useState } from "react";

const Add = ({
  stockNumber,
  onQuantityChange,
}: {
  stockNumber: number;
  onQuantityChange: (quantity: number) => void;
}) => {

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "i" | "d") => { // i -> increase & d -> decrease
    if (type === "d" && quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity); // Update local state
      onQuantityChange(newQuantity); // Notify parent after state change
    }
    if (type === "i" && quantity < stockNumber) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity); // Update local state
      onQuantityChange(newQuantity); // Notify parent after state change
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex flex-col sm:flex-row gap-5">
        <div className={`bg-gray-200 py-2 px-4 rounded-lg flex items-center justify-between w-32`}>
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
            disabled={quantity === stockNumber || quantity === 5}
          >
            +
          </button>
        </div>

        {quantity === 5 && (
          <div className="text-xs text-red-500 w-1/3">You cannot buy more than 5 quantity at once.</div>
        )}

        {stockNumber < 1 && (
          <div className="text-xs">Product is out of stock</div>
        )}

        {stockNumber < 10 && (
          <div className="text-xs">
            Only <span className="text-red-500">{stockNumber} items</span>{" "}
            left!
            <br /> Don't miss it
          </div>
        )}

      </div>
    </div>
  );
};

export default Add;