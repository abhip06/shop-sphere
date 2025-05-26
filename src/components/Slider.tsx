"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 30% off!",
    img: "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-100 to-pink-100",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    url: "/",
    bg: "bg-gradient-to-r from-pink-100 to-blue-100",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 40% off!",
    img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/",
    bg: "bg-gradient-to-r from-blue-100 to-yellow-100",
  },
  {
    id: 4,
    title: "Diwali Sale Collections",
    description: "Sale! Up to 70% off!",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/",
    bg: "bg-gradient-to-r from-orange-200 to-yellow-50",
  },
  {
    id: 5,
    title: "Good Friday Sale Collection",
    description: "Sale! Up to 60% off!",
    img: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    url: "/",
    bg: "bg-gradient-to-r from-gray-100 to-blue-100",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
          setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 3000);

      return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {
          slides.map((slide) => (
            // <div
            //   className={`${slide.bg} w-screen h-full flex flex-col gap-16 ${slide.id % 2 === 1 ? "xl:flex-row-reverse" : "xl:flex-row"}`}
            //   key={slide.id}
            // >
            //   {/* TEXT CONTAINER */}
            //   <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
            //     <p className="text-xl lg:text-3xl">
            //       {slide.description}
            //     </p>
            //     <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
            //       {slide.title}
            //     </h1>
            //     <Link href={slide.url}>
            //       <button className="rounded-md bg-black text-white py-3 px-4 ">
            //         SHOP NOW
            //       </button>
            //     </Link>
            //   </div>
            //   {/* IMAGE CONTAINER */}
            //   <div className="h-1/2 xl:w-1/2 xl:h-full relative">
            //     <Image
            //       src={slide.img}
            //       alt=""
            //       fill
            //       sizes="100%"
            //       className="object-cover brightness-50"
            //     />
            //   </div>
            // </div>
            <div
              className="w-screen h-full flex items-center justify-center text-center"
              key={slide.id}
              style={{ backgroundImage: `url(${slide.img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "darken" }}
            >
              <div className="absolute inset-0 bg-black opacity-10"></div>
              {/* Text Content */}
              <div className="text-white z-10 flex flex-col gap-5">
                <p className="text-xl lg:text-3xl">{slide.description}</p>
                <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                  {slide.title}
                </h1>
                <Link href={slide.url}>
                  <button className="rounded-md bg-white text-black py-3 px-4 mt-4 hover:bg-gray-200">
                    SHOP NOW
                  </button>
                </Link>
              </div>
            </div>
          ))
        }
      </div>
      <div className="absolute mx-auto left-1/3 sm:left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-white cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""
              }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider;