import Image from "next/image";
import FlipCard, { BackCard, FrontCard } from "@/components/Flipcard/Flipcard";
import { motion } from "framer-motion";
import NFT from "public/images/Lottery.png";
import Navbar from "@/components/Navbar/navbar-before-login";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import GetInstallment from "./services/contract/get-installment";

export default function Home() {
  const { address } = useAccount();
  const [lotteryNumber, setLotteryNumber] = useState("");
  const { data, isError, isLoading } = GetInstallment();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log("Address", address);
  console.log("lotteryNumber", lotteryNumber);
  const installment = data && data._hex;

  const handleLotteryNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLotteryNumber(event.target.value);
  };

  return (
    mounted && (
      <div className="flex justify-center items-center h-screen">
        <div className="place-item-center">
          <Image src={NFT} width="500" height="500" alt="Thai Lottery NFT" />
        </div>
      </div>
    )
  );
}
