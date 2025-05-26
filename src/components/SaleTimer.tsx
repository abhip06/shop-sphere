"use client"

import React, { useEffect, useState } from 'react';


const SaleTimer = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    // let deadline = "November, 12, 2024";
    const currentDate = new Date(Date.now());
    currentDate.setDate(currentDate.getDate() + 1); // One day ahead
    const deadline = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / (1000 * 60)) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    }

    useEffect(() => {
        console.log(deadline);

        const interval = setInterval(() => {
            getTime();
        }, 1000);

        return () => clearInterval(interval);
    }, [])
    return (
        <div className="flex flex-col justify-center items-start gap-3 bg-violet-100 rounded-md p-7">
            <h2 className="text-lg text-gray-500 font-medium">Sale ends in</h2>
            <div className="flex items-end gap-2 text-gray-600 font-semibold text-2xl">
                {days < 10 ? "0" + days : days}
                <span className="text-gray-500 text-base">D</span>
                <span>:</span>
                {hours < 10 ? "0" + hours : hours}
                <span className="text-gray-500 text-base">H</span>
                <span>:</span>
                {minutes < 10 ? "0" + minutes : minutes}
                <span className="text-gray-500 text-base">M</span>
                <span>:</span>
                {seconds < 10 ? "0" + seconds : seconds}
                <span className="text-gray-500 text-base">S</span>
            </div>
        </div>
    )
}

export default SaleTimer