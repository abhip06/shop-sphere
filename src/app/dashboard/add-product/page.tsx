import { Metadata } from "next";
import AddProductForm from "../_components/AddProductForm";

export const metadata: Metadata = {
  title: "Add Product",
};

const AddProduct = () => {
    const darkMode = true;
  return (
    <div className={`overflow-y-auto ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} w-full h-[calc(100vh-160px)] p-12`}>
        <AddProductForm />
    </div>
  )
}

export default AddProduct;