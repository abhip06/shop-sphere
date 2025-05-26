import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "auto";

export const metadata: Metadata = {
  title: "Shop Sphere",
  description: "Discover the online shopping destination at Shop Sphere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <Navbar />
        <main>{children}</main>
        <ToastContainer
          theme="dark"
          className="toast-container"
          position="bottom-right"
        />
        <Footer />
      </body>
    </html>
  );
}
