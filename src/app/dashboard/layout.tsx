import type { Metadata } from "next";
import SideBar from "./_components/SideBar";
import DashboardNavbar from "./_components/DashboardNavbar";

export const dynamic = "auto";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-full">
            <SideBar />
            <div
                className="w-full h-full"
            >
                <DashboardNavbar />
                <main>{children}</main>
            </div>
        </div>
    );
}
