import { formatPrice } from '@/lib/utils';
import React from 'react'
import { BsEyeFill } from 'react-icons/bs'

interface DataCardProps {
    label: string;
    value: number;
    percentage: number;
    icon: JSX.Element;
    formatRequired: boolean;
}

const DataCards = ({
    label,
    value,
    percentage,
    icon,
    formatRequired
}: DataCardProps) => {
    let darkMode = true;
    return (
        <div className={`flex flex-col justify-between items-start w-full h-full gap-5 p-8 rounded-md ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}>
            <div className={`flex justify-center items-center w-11 h-11 text-center rounded-full text-xl ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}>
                {icon}
            </div>
            <div className="flex justify-between items-end w-full">
                <div className="flex flex-col items-start gap-2">
                    <h3 className="text-xl font-semibold">{formatRequired ? formatPrice(value) : value}</h3>
                    <span className="text-base text-gray-500">{label}</span>
                </div>
                <span className={`text-base ${percentage > 0 ? "text-green-500" : "text-red-500"}`}>{percentage > 0 && "+"}{percentage}%</span>
            </div>
        </div>
    )
}

export default DataCards