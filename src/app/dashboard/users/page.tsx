import { Metadata } from "next";
import UsersList from "../_components/UsersList";


export const metadata: Metadata = {
    title: "All Users",
};

const UsersPage = () => {
    let darkMode = true;
    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} w-full min-h-[calc(100vh-80px)] py-8 px-12`}>
            <h2 className="text-3xl font-light mb-10">All Users</h2>
            <UsersList />
        </div>
    )
}

export default UsersPage