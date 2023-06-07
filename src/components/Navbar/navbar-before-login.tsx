import Applogo from "public/images/Jackpot.svg";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function NavbarBeforeLogin() {
  return (
    <>
      <div className="navbar bg-secondary shadow-xl">
        <div className="navbar-start">
          <Link href={"/"}>
            <Image src={Applogo} alt="Applogo" width={75} height={75} />
          </Link>
          <Link
            className="btn btn-ghost normal-case text-xl text-topic"
            href={"/"}
          >
            ลอตเตอรี่ไทย
          </Link>
        </div>
        <div className="navbar-end">
          <ConnectButton accountStatus="address" chainStatus="name" />
        </div>
      </div>
    </>
  );
}
