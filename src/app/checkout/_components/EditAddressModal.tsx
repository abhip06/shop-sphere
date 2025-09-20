"use client"

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

interface AddressType {
    line1: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
}

interface EditAddressModalProps {
    address: AddressType | null;
    modalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({ address, modalState }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [updatedAddress, setUpdatedAddress] = useState<AddressType | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumberField = ["pincode"].includes(name);
    const processedValue = isNumberField ? Number(value) : value;

    setUpdatedAddress(prev => 
        prev 
        ? { ...prev, [name]: processedValue } 
        : { ...address, [name]: processedValue } as AddressType
    );
};


    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="h-5/6 overflow-y-scroll bg-white text-gray-800 w-full max-w-lg p-10 rounded-lg shadow-md">
                <button onClick={() => modalState(false)} className="mb-8">
                    <MdClose className="text-4xl" />
                </button>
                <h2 className="text-2xl font-medium mb-8">{address ? "Change Address" : "Add Address"}</h2>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label className={`text-sm`}>Line 1</label>
                        <input
                            type="text"
                            name="line1"
                            value={updatedAddress?.line1 || ""}
                            onChange={handleInputChange}
                            placeholder="Enter Line 1"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent`}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={`text-sm`}>City</label>
                        <input
                            type="text"
                            name="city"
                            value={updatedAddress?.city || ""}
                            onChange={handleInputChange}
                            placeholder="Enter City"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent`}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={`text-sm`}>State</label>
                        <input
                            type="text"
                            name="state"
                            value={updatedAddress?.state || ""}
                            onChange={handleInputChange}
                            placeholder="Enter State"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent`}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={`text-sm`}>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={updatedAddress?.country || ""}
                            onChange={handleInputChange}
                            placeholder="Enter Country"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent`}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={`text-sm`}>Pincode</label>
                        <input
                            type="number"
                            name="pincode"
                            value={updatedAddress?.pincode || ""}
                            onChange={handleInputChange}
                            placeholder="Enter Pincode"
                            className={`relative ring-1 rounded-md p-4 outline-none bg-transparent`}
                        />
                    </div>
                    <button
                        disabled={loading}
                        className={`bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""} mt-10`}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditAddressModal;