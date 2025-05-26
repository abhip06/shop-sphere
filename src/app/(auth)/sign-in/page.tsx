import { Metadata } from 'next';
import SignInForm from '../_components/SignInForm';

export const metadata: Metadata = {
  title: "Sign in",
};

const SignIn = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] mt-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col items-center justify-start">
        <SignInForm />
    </div>
  )
}

export default SignIn