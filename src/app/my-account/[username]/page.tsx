import { Metadata } from "next";
import UserInfoSection from "../_components/UserInfoSection";

export const metadata: Metadata = {
  title: "My Account",
};

const ProfilePage = async () => {  

  return (
    <div className="flex mt-5 flex-col md:min-h-[calc(100vh-80px)] items-start px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl mb-10">Account Details</h1>
        <UserInfoSection />
    </div>
  );
};

export default ProfilePage;