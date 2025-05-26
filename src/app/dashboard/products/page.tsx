import { Metadata } from 'next';
import ProductsList from '../_components/ProductsList'

export const metadata: Metadata = {
    title: "All Products",
};

const ProductsPage = () => {
    let darkMode = true;
  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} overflow-y-scroll w-full h-[calc(100vh-160px)] py-8 px-12`}>
        <h2 className="text-3xl font-light mb-10">All Products</h2>
        <ProductsList />
    </div>
  )
}

export default ProductsPage