import Image from "next/image";
import Link from "next/link";

import { FiShoppingBag } from "react-icons/fi";
import { FaInstagram, FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-12 xl:20 2xl:px-40 bg-violet-50 text-sm">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <div className="flex flex-col justify-center items-start gap-2">
            <Link href="/">
              <div
                className="flex items-center gap-2 text-2xl font-medium"
              >
                <FiShoppingBag className="text-violet-500 text-3xl font-extrabold" />
                <div>
                  <span className="text-violet-500 tracking-wider">Shop</span>
                  <span className="text-gray-800 tracking-wider">Sphere</span>
                </div>
              </div>
            </Link>
            <p>
              Ultimate online destination for shopping.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/abhinav-patel-38480b254/"
              className="text-2xl text-gray-500 hover:text-violet-500"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/abhip06"
              className="text-2xl text-gray-500 hover:text-violet-500"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.x.com/abhip006"
              className="text-2xl text-gray-500 hover:text-violet-500"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.instagram.com/"
              className="text-2xl text-gray-500 hover:text-violet-500"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        {/* CENTER */}
        <div className="flex justify-between w-full xl:w-1/2 flex-col md:flex-row gap-8 md:gap-0">
          <div className="flex flex-col gap-5">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-4">
              <Link href="" className="hover:text-violet-500">About</Link>
              <Link href="" className="hover:text-violet-500">Blog</Link>
              <Link href="" className="hover:text-violet-500">Affiliates</Link>
              <Link href="" className="hover:text-violet-500">Careers</Link>
              <Link href="" className="hover:text-violet-500">Contact</Link>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-4">
              <Link href="" className="hover:text-violet-500">New Arrivals</Link>
              <Link href="" className="hover:text-violet-500">All Products</Link>
              <Link href="" className="hover:text-violet-500">Women</Link>
              <Link href="" className="hover:text-violet-500">Men</Link>
              <Link href="" className="hover:text-violet-500">Accessories</Link>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-4">
              <Link href="" className="hover:text-violet-500">Customer Support</Link>
              <Link href="" className="hover:text-violet-500">Find a Store</Link>
              <Link href="" className="hover:text-violet-500">Gift Card</Link>
              <Link href="" className="hover:text-violet-500">Legal & Privacy</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-full overflow-hidden outline-none"
            />
            <button className="px-3 bg-violet-500 text-white">JOIN</button>
          </div>
        </div>
      </div>
      <div className="bg-gray-500 h-[1px] my-12"></div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-base font-medium text-gray-800">&copy; 2025 shopsphere.in</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">India | English</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium"> &#8377;  Indian Rupees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;