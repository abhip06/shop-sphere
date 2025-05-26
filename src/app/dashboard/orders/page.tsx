import React from 'react'
import OrderList from '../_components/OrderList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All Orders",
};

const AllOrders = () => {
    const darkMode = true;

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} overflow-y-scroll w-full h-[calc(100vh-160px)] p-12`}>
        <h2 className="text-3xl font-light mb-10">All Orders</h2>
        <OrderList />
    </div>
  )
}

export default AllOrders