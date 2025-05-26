import { Metadata } from "next";
import SignUpForm from "../_components/SignUpForm"

export const metadata: Metadata = {
  title: "Sign up",
};

const page = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] mt-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col items-center justify-start">
        <SignUpForm />
    </div>
  )
}

export default page