import { Metadata } from "next";
import OrderDetails from "../_components/OrderDetails";

export const metadata: Metadata = {
    title: "Order",
};

const OrderPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;

    return (
        // <div className="bg-gray-900 flex flex-col min-h-[calc(100vh-175px)] md:min-h-[calc(100vh-80px)] py-10 items-center justify-center px-5 md:px-auto">
        //     <div
        //         className="bg-gray-900 text-white shadow-[rgba(255,255,255,0.1)_0px_0px_25px_10px] rounded-md px-8 md:px-12 py-8 md:py-12 w-full sm:w-2/3 lg:w-1/3"
        //     >
        //         <div className="flex items-center gap-3 text-green-500 text-4xl md:text-5xl font-light"><GrStatusGood /> Success</div>
        //         <h1 className="mt-7 sm:mt-12 text-xl sm:text-2xl">Order Details</h1>
        //         <div className="mt-4 sm:mt-8 flex flex-col gap-4">
        //             <div className="flex items-center gap-3">
        //                 <span className="font-medium">Order Id: </span>
        //                 <span>{id}</span>
        //             </div>
        //             <div className="text-sm sm:text-base flex items-center gap-3">
        //                 <span className="font-medium">Receiver Name: </span>
        //                 <span>
        //                     John Doe
        //                 </span>
        //             </div>
        //             <div className="text-sm sm:text-base flex items-center gap-3">
        //                 <span className="font-medium">Receiver Email: </span>
        //                 <span>johndoe01@gmail.com</span>
        //                 {/* <span>{order?.email}</span> */}
        //             </div>
        //             <div className="text-sm sm:text-base flex items-center gap-3">
        //                 <span className="font-medium">Receiver Phone no.: </span>
        //                 <span>+91 9876543210</span>
        //             </div>
        //             <div className="text-sm sm:text-base flex items-center gap-3">
        //                 <span className="font-medium">Amount Paid: </span>
        //                 <span>{formatPrice(154000)}</span>
        //                 {/* <span>{order?.priceSummary?.subtotal?.amount}</span> */}
        //             </div>
        //             <div className="text-sm sm:text-base flex items-center gap-3">
        //                 <span className="font-medium">Payment Status: </span>
        //                 <span className="text-green-500">Paid</span>
        //                 {/* <span>{order?.paymentStatus}</span> */}
        //             </div>
        //             <div className="text-sm sm:text-base flex items-center gap-3">
        //                 <span className="font-medium">Order Status: </span>
        //                 <span className="text-orange-400">In Progress</span>
        //                 {/* <span>{order.orderStatus}</span> */}
        //             </div>
        //             <div className="text-sm sm:text-base flex items-center gap-3">
        //                 <span className="font-medium">Delivery Address: </span>
        //                 <span>
        //                     {/* {shippingAddress?.line1 + " "}
        //                         {shippingAddress?.city + " "}<br/>
        //                         {"Pincode - " + shippingAddress?.pincode + " "}<br/>
        //                         {shippingAddress?.state + " "}
        //                         {shippingAddress?.country} */}
        //                     Subhash Bhavan, Tikla road, Vaishali Nagar, New Delhi, IN.
        //                 </span>
        //             </div>
        //             <span
        //                 className="mt-5 w-max text-blue-500 underline cursor-pointer hover:text-blue-400"
        //             >
        //                 Download Invoice
        //             </span>
        //         </div>
        //     </div>
        //     <Link href="/" className="mt-12 text-white text-sm">
        //         Have a problem? Contact us at support@shopsphere.in
        //     </Link>
        // </div>
        <OrderDetails orderId={id} />
    );

};

export default OrderPage;