"use client"

import { authStore } from '@/store/Auth';
import Loader from '@/components/Loader';
import { ChangeEvent, useEffect, useState } from "react";

interface Address {
    line1: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
}

interface FormDataType {
    fullName: string;
    email: string;
    address: Address[];
}

const UserInfoSection = () => {
    const { user } = authStore();

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<FormDataType>({
        fullName: '',
        email: '',
        address: [{ line1: '', city: '', state: '', country: '', pincode: 999999 }],
    });

    
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number | null = null,
        field: keyof Address | null = null
    ) => {
        const { name, value } = e.target;

        if (index !== null && field) {
            setFormData((prevFormData) => {
                const updatedAddress = [...prevFormData.address];
                updatedAddress[index] = {
                    ...updatedAddress[index],
                    [field]: value,
                };
                return { ...prevFormData, address: updatedAddress };
            });
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };
    
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user?.fullName || '',
                email: user?.email || '',
                address: user?.address || [{ line1: '', city: '', state: '', country: '', pincode: 999999 }],
            });
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <form className="flex flex-col gap-8 w-full">
                {/* <input type="text" hidden name="id" value={user.member.contactId} /> */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-20 w-full">
                    <div className="flex flex-1 flex-col gap-8 w-full">
                        <div className="flex flex-col gap-4">
                            <label className="text-sm text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData?.fullName || ""}
                                onChange={handleInputChange}
                                className="ring-1 ring-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="text-sm text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={user?.username || ""}
                                onChange={handleInputChange}
                                disabled={true}
                                className="ring-1 ring-gray-300 rounded-md p-2 w-full disabled:cursor-not-allowed disabled:bg-gray-100"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="text-sm text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={"+91 9876543210"}
                                onChange={handleInputChange}
                                className="ring-1 ring-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="text-sm text-gray-700">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={formData?.email || ""}
                                onChange={handleInputChange}
                                className="ring-1 ring-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                        <label className="text-base font-medium text-gray-700">Address</label>
                        {user?.address?.map((ad, index) => (
                            <div className="flex justify-center items-start flex-col gap-4" key={index}>
                                <label className="text-sm text-gray-700">Address {index + 1}</label>

                                <label className="text-sm text-gray-700">Line 1</label>
                                <input
                                    type="text"
                                    name={`line1-${index}`}
                                    value={ad?.line1 || ""}
                                    onChange={(e) => handleInputChange(e, index, 'line1')}
                                    className="ring-1 ring-gray-300 rounded-md p-2 w-full"
                                />
                                <label className="text-sm text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={ad?.city || ""}
                                    onChange={(e) => handleInputChange(e, index, "city")}
                                    className="ring-1 ring-gray-300 rounded-md p-2 w-full"
                                />
                                <label className="text-sm text-gray-700">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={ad?.state || ""}
                                    onChange={(e) => handleInputChange(e, index, "state")}
                                    className="ring-1 ring-gray-300 rounded-md p-2 w-full"
                                />
                                <label className="text-sm text-gray-700">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={ad?.country || ""}
                                    onChange={(e) => handleInputChange(e, index, "country")}
                                    className="ring-1 ring-gray-300 rounded-md p-2 w-full"
                                />
                                <label className="text-sm text-gray-700">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={ad?.pincode || ""}
                                    onChange={(e) => handleInputChange(e, index, "pincode")}
                                    className="ring-1 ring-gray-300 rounded-md p-2 w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    disabled={loading}
                    className="bg-violet-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-violet-400 disabled:bg-violet-200 disabled:cursor-not-allowed w-max"
                >
                    {loading ? "Updating" : "Update"}
                </button>
            </form>
        </>
    )
}

export default UserInfoSection