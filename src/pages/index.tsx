import Image from "next/image";
import FlipCard, { BackCard, FrontCard } from "@/components/Flipcard/Flipcard";
import { motion } from "framer-motion";
import NFT from "public/images/nft.png";
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
      <>
        {/* <Navbar></Navbar> */}
        <div className="grid grid-cols-2 gap-4 mt-5 ">
          <div className="flex flex-col justify-center items-center text-topic  text-center gap-4">
            {/* <div className="font-bold text-2xl">ซื้อลอตเตอรี่ของคุณได้ที่นี่</div> */}
            <div className="font-bold text-2xl">
              ซื้อลอตเตอรี่ของคุณได้ที่นี่
            </div>

            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              placeholder="ใส่เลขหวยที่คุณต้องการจะซื้อ"
              className="input w-full max-w-xs shadow-md text-primary text-center"
              id="lotteryNumber"
              name="lotteryNumber"
              value={lotteryNumber}
              onChange={handleLotteryNumberChange}
              maxLength={6}
              required
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                );
              }}
            />
            <button className="btn bg-primary text-secondary rounded-lg">
              ซื้อเลย!
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <FlipCard>
              <FrontCard>
                <Image
                  layout="responsive"
                  src={NFT}
                  width="500"
                  height="500"
                  alt="RainbowKit Demo NFT"
                />
                <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
              </FrontCard>
              <BackCard>
                <div style={{ padding: 24 }}>
                  <Image
                    src="/nft.png"
                    width="80"
                    height="80"
                    alt="RainbowKit Demo NFT"
                    style={{ borderRadius: 8 }}
                  />
                  {/* <h2 style={{ marginTop: 24, marginBottom: 6 }}>NFT Minted!</h2>
                <p style={{ marginBottom: 24 }}>
                  Your NFT will show up in your wallet in the next few minutes.
                </p>
                <p style={{ marginBottom: 6 }}>View on </p>
                <p>View on </p> */}
                </div>
              </BackCard>
            </FlipCard>
          </div>
        </div>
      </>
    )
  );
}
