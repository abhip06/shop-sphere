import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    let authStatus = false;

  if (authStatus) {
    return redirect("/");
  }
  return <>{children}</>;
};

export default AuthLayout;