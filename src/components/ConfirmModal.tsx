"use client"

import { useState } from "react";

const ConfirmModal = ({
    textMessage,
    modalType,
    onConfirm,
}: {
    textMessage: string;
    modalType: "confirm" | "alert";
    onConfirm: (value: boolean) => void;
}) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-heading"
        >
            <div className="flex flex-col h-max bg-gray-900 text-white w-full max-w-lg p-10 rounded-lg shadow-lg">
                <h2 className="text-base">{textMessage}</h2>
                {
                    modalType === "confirm" ? (
                        <div className="flex items-center gap-8 w-full justify-center">
                            <button
                                onClick={() => onConfirm(true)}
                                className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition mt-10`}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => onConfirm(false)}
                                className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mt-10`}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => onConfirm(true)}
                            className={`bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition mt-10`}
                        >
                            Okay
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default ConfirmModal;