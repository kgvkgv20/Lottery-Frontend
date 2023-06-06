import Image from "next/image";
import FlipCard, { BackCard, FrontCard } from "@/components/Flipcard/Flipcard";
import { motion } from "framer-motion";
import NFT from "public/images/nft.png";
import Navbar from "@/components/Navbar/navbar-before-login";
import { useAccount, Address } from "wagmi";
import React, { useEffect, useState } from "react";
import GetInstallment from "./services/contract/get-installment";
import { jsonLottery } from "./services/uploadIPFS";
import useMintLottery from "./services/contract/buy-lottery";
import { BigNumber, ethers } from "ethers";

export default function BuyLotteryPage() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [lotteryNumber, setLotteryNumber] = useState("");
  const { data, isError, isLoading } = GetInstallment();
  const installmentFromContract = data && data._hex;
  const [uri, setUri] = useState("");

  console.log("Address", address);
  console.log("lotteryNumber", lotteryNumber);

  const handleLotteryNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLotteryNumber(event.target.value);
  };
  const handleJsonLottery = async () => {
    console.log("handleJsonLottery law ja");
    try {
      const number = lotteryNumber || ""; // Use an empty string as fallback if lotteryNumber is undefined
      const installment = installmentFromContract || ""; // Use an empty string as fallback if installmentFromContract is undefined

      const uri = await jsonLottery(number, installment);
      console.log("URI:", uri);

      handleMintLottery();
      // Do something with the returned URI
    } catch (error) {
      console.log("Error calling jsonLottery:", error);
    }
  };

  const parsedLotteryNumber = lotteryNumber
    ? ethers.BigNumber.from(lotteryNumber)
    : ethers.constants.Zero;

  const {
    data: mintData,
    isError: mintError,
    isLoading: mintLoading,
    write,
  } = useMintLottery(
    address as Address,
    // ethers.BigNumber.from(lotteryNumber),
    parsedLotteryNumber,
    uri
  );

  const handleMintLottery = async () => {
    try {
      if (write) {
        await write();
        console.log("Transaction successful");
        setLotteryNumber("");
      } else {
        console.log("write is undefined");
      }
    } catch (error) {
      console.log("Error:", error);
    }
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
            <button
              className="btn bg-primary text-secondary rounded-lg"
              onClick={handleJsonLottery}
              type="submit"
            >
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
