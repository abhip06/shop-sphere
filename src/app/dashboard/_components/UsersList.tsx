"use client"

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

import { MdDelete } from "react-icons/md";

interface IUserType {
    id: string;
    fullName: string;
    email: string;
    role: string;
}

const roles = ["ADMIN", "CUSTOMER", "MODERATOR"];

const UsersList = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [users, setUsers] = useState<IUserType[]>([]);

    const fetchAllUsers = async () => {
        try {
            const response = await fetch("/api/users");

            if (!response.ok) {
                setError("Error while fetching all Users");
                return;
            }

            const data = await response.json();
            setUsers(data.users);

        } catch (err) {
            setError("Could not fetch all Users.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (userId: string) => {
        setLoading(true);

        try {
            const response = await fetch(`/api/users/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // if (!response.ok) {
            //     toast.error("Error occured while deleting User.");
            //     return;
            // }

            const data = await response.json();

            if (data.success) {
                setUsers((prev) => prev.filter((user) => user.id !== userId));
                toast.success(data.message || "User deleted successfully.");
            } else {
                toast.error(data.error.message || "Error occured while deleting user.");
            }

        } catch (err) {
            toast.error("Something went wrong.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const updateUserRole = async (userId: string, newRole: string) => {
        setLoading(true);

        newRole = newRole.toUpperCase();

        try {
            const response = await fetch(`/api/users/edit-role/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role: newRole }),
            });

            const data = await response.json();

            if (data.success) {
                // Update the user's role locally
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, role: newRole } : user
                    )
                );
                toast.success(data.message || "User role updated successfully.");
            } else {
                toast.error(data.error?.message || "Error occurred while updating user role.");
            }
        } catch (err) {
            toast.error("Something went wrong.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    if (loading) {
        return (
            <UsersLoadingSkeleton />
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center gap-10 w-full">
                {error}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-col">
                <div className="flex border-b bg-gray-800 font-semibold p-2">
                    <div className="w-1/12 py-2 px-4 text-left">#</div>
                    <div className="w-4/12 py-2 px-4 text-left">Full Name</div>
                    <div className="w-5/12 py-2 px-4 text-left">Email</div>
                    <div className="w-3/12 py-2 px-4 text-left">Role</div>
                    <div className="w-3/12 py-2 px-4 text-right">Actions</div>
                </div>
                {users.map((user, index) => (
                    <div key={index} className={`${index % 2 !== 0 ? "bg-gray-800" : ""} flex border-b p-1`}>
                        <div className="w-1/12 py-2 px-4 text-left">{index + 1}</div>
                        <div className="w-4/12 py-2 px-4 text-left">{user.fullName}</div>
                        <div className="w-5/12 py-2 px-4 text-left">{user.email}</div>
                        <div className="w-3/12 py-2 px-4 text-left">
                            <select
                                value={user.role}
                                onChange={(e) => updateUserRole(user.id, e.target.value)}
                                className={`${index % 2 !== 0 ? "bg-gray-900" : "bg-gray-800"} px-4 py-2 rounded-md cursor-pointer`}
                            >
                                {roles.map((role) => (
                                    <option key={role} value={role} className="font-sans">
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-3/12 py-2 px-4 text-right flex justify-end">
                            <span
                                onClick={() => deleteUser(user.id ?? "")}
                                className="flex gap-2 items-center text-red-500 hover:text-red-300 cursor-pointer"
                            >
                                <MdDelete className="text-xl" />
                                Delete
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersList