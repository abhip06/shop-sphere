import { Metadata } from 'next';
import { lazy, Suspense } from 'react';
import SingleProductCheckout from './_components/SingleProductCheckout';
import CartItemsCheckout from './_components/CartItemsCheckout';

export const metadata: Metadata = {
    title: "Checkout",
};

const CheckOutPage = ({
    searchParams
}: {
    searchParams: {
        productId?: string
        quantity?: number;
    }
}) => {
    const { productId, quantity } = searchParams;

    return (
        <div className="min-h-[calc(100vh-180px)] py-8 px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-32">

            {
                productId && quantity ? (
                        <SingleProductCheckout productId={productId} quantity={quantity > 5 ? 5 : quantity} />
                ) : (
                        <CartItemsCheckout />
                )
            }
        </div>
    )
}

export default CheckOutPage;