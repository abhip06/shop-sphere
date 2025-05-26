import { Metadata } from "next";
import DataCards from "./_components/DataCards";
import { BsEyeFill, BsGraphUp } from 'react-icons/bs'
import { GrMoney } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";

export const metadata: Metadata = {
    title: "Dashboard",
};

const DashboardPage = () => {
    let darkMode = true;
    return (
        <div className={`overflow-y-auto ${darkMode ? "bg-gray-900 text-white" : "text-gray-800"} min-h-[calc(100vh-80px)] p-12`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-4">
                <DataCards
                    label="Total Revenue"
                    value={800000}
                    percentage={12}
                    icon={<GrMoney />}
                    formatRequired={true}
                />
                <DataCards
                    label="Last Week Revenue"
                    value={45050}
                    percentage={5}
                    icon={<BsGraphUp />}
                    formatRequired={true}
                />
                <DataCards
                    label="Total Products"
                    value={1520}
                    percentage={7.5}
                    icon={<FiShoppingBag />}
                    formatRequired={false}
                />
                <DataCards
                    label="Total Users"
                    value={3501}
                    percentage={-2.4}
                    icon={<FaUsers />}
                    formatRequired={false}
                />
            </div>
        </div>
    )
}

export default DashboardPage