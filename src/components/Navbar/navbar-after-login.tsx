import Applogo from "public/images/Jackpot.svg";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function NavbarAfterLogin() {
  return (
    <div className="">
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
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-topic font-bold">
            <li>
              <Link href="/buy-lottery">ซื้อลอตเตอรี่</Link>
            </li>
            <li>
              <Link href="/reward-lottery">ประกาศผลลอตเตอรี่</Link>
            </li>
            <li>
              <Link href="/my-lottery">ลอตเตอรี่ของฉัน</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <ConnectButton accountStatus="address" chainStatus="name" />
        </div>
      </div>
    </div>
  );
}
