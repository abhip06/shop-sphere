import { formatDateTime, formatPrice } from "@/lib/utils";
import { FiShoppingBag } from "react-icons/fi";

interface AddressType {
    id?: number;
    line1: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
}


interface InvoiceProps {
    orderId: string;
    customerName: string;
    email: string;
    phone: string;
    items: { id: number, quantity: number, product: { title: string }, price: number }[];
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    address: AddressType;
    date: string | Date;
}

const InvoiceTemplate = ({
    orderId,
    customerName,
    email,
    phone,
    items,
    totalAmount,
    paymentMethod,
    paymentStatus,
    address,
    date
}: InvoiceProps) => {

    const receiptNumberGenerator = () => {
        let receiptNumber: string = "";
        const stringLength: number = 7;
        const charset = "0123456789";

        for (let i = 0; i < stringLength; i++) {
            receiptNumber += charset.charAt(Math.floor(Math.random() * charset.length + 1));
        }

        return receiptNumber;
    }

    return (
        <div className="flex flex-col gap-10 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            {/* Header Section */}
            <header className="flex justify-between items-center border-b-2 pb-4">
                <div className="flex flex-col">
                    <div
                        className="flex items-center gap-2 text-3xl font-medium"
                    >
                        <FiShoppingBag className="text-violet-500" />
                        <div>
                            <span className="text-violet-500 tracking-wider">Shop</span>
                            <span className="text-gray-800 tracking-wider">Sphere</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Ultimate online destination for shopping.</p>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl font-semibold text-gray-800">Invoice</h2>
                    <p className="text-sm text-gray-600">Receipt no: <span className="font-semibold">#{receiptNumberGenerator()}</span></p>
                </div>
            </header>

            <p className="text-sm text-gray-600">Order ID: <span className="font-semibold">{orderId}</span></p>

            {/* Customer Information */}
            <section className="">
                <h3 className="text-lg font-semibold text-gray-800">Billing Information</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-sm">
                        <p className="font-medium">{customerName}</p>
                        <p>Phone no.- {phone}</p>
                        <p>Email: {email}</p>
                    </div>
                    <div className="text-sm">
                        <p className="font-medium">Shipping Address:</p>
                        <p>{address.line1 + ", " + address.city}</p>
                        <p>{"Pincode - " + address.pincode}</p>
                        <p>{address.state + ", " + address.country.toUpperCase()}</p>
                    </div>
                </div>
            </section>

            {/* Order Details Table */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Details</h3>
                <div className="flex flex-col text-sm">
                    <div className="flex border-b bg-gray-100 font-semibold text-gray-700">
                        <div className="w-1/12 py-2 px-4 text-left">#</div>
                        <div className="w-5/12 py-2 px-4 text-left">Item</div>
                        <div className="w-3/12 py-2 px-4 text-right">Quantity</div>
                        <div className="w-3/12 py-2 px-4 text-right">Price</div>
                    </div>
                    {items.map((item, index) => (
                        <div key={index} className="flex border-b">
                            <div className="w-1/12 py-2 px-4 text-left">{index + 1}</div>
                            <div className="w-5/12 py-2 px-4 text-left">{item.product.title}</div>
                            <div className="w-3/12 py-2 px-4 text-right">{item.quantity}</div>
                            <div className="w-3/12 py-2 px-4 text-right">{item.price}</div>
                        </div>
                    ))}
                    <div className="flex font-semibold">
                        <div className="w-1/12 py-2 px-4"></div>
                        <div className="w-5/12 py-2 px-4 text-right"></div>
                        <div className="w-3/12 py-2 px-4 text-right">Total:</div>
                        <div className="w-3/12 py-2 px-4 text-right font-bold">{formatPrice(totalAmount)}</div>
                    </div>
                </div>
            </section>

            {/* Payment Method and Footer */}
            <section className="">
                <p className="text-sm"><span className="font-semibold">Payment Status:</span> {paymentStatus}</p>
                <p className="text-sm"><span className="font-semibold">Payment Method:</span> {paymentMethod}</p>
            </section>

            <footer className="border-t pt-6">
                <p className="text-sm text-gray-600 mb-4">Billing Date: {formatDateTime(date)}</p>
                <p className="text-sm text-gray-800 text-center font-semibold">Thank you for your purchase! We hope to see you again soon.</p>
            </footer>
        </div>
    );
};

export default InvoiceTemplate;
