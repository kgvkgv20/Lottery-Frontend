import { useAccount } from "wagmi";
import NavbarBeforeLogin from "./Navbar/navbar-before-login";
// import NavbarAfterLogin from "./Navbar/navbar-after-login";
import { Suspense } from "react";
import { useAsync } from "react-async-hook";
import Head from "next/head";
import NavbarAfterLogin from "./Navbar/navbar-after-login";

// Define the LayoutProps type
type LayoutProps = {
  children: React.ReactNode;
};

// Export the LayoutProps type
export type { LayoutProps };

// Use the LayoutProps type in the Layout component
export default function Layout({ children }: LayoutProps) {
  const { address, isConnected } = useAccount();
  const { result: isLoggedIn } = useAsync(async () => {
    if (isConnected) return true;
    // do some async check for user authentication here
    // return true if user is authenticated, false otherwise
  }, [isConnected]);

  return (
    <div className="bg-gradient-linear min-h-screen overflow-y-auto ">
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
        `}</style>
      </Head>
      {/* <div className="fixed w-full"> */}
      <div className="">
        {isLoggedIn ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}
        <Suspense fallback={<div>Loading...</div>}>
          <main className="">{children}</main>
        </Suspense>
      </div>
    </div>
  );
}
