import React, { PropsWithChildren } from "react";
import ErrorBoundary from "@/components/Layout/ErrorBoundary";
import NavBar from "../Navbar";
import { AuthContextProvider } from "@/contexts/AuthContext";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ErrorBoundary fallback={<div>Sorry, something went wrong.</div>}>
        <AuthContextProvider>
          <NavBar />
          {children}
        </AuthContextProvider>
      </ErrorBoundary>
    </>
  );
};
export default Layout;
