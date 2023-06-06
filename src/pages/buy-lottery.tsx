import Image from "next/image";
import FlipCard, { BackCard, FrontCard } from "@/components/Flipcard/Flipcard";
import { motion } from "framer-motion";
import NFT from "public/images/Lottery.png";
import Navbar from "@/components/Navbar/navbar-before-login";
import { useAccount, Address } from "wagmi";
import React, { useEffect, useState } from "react";
import GetInstallment from "./services/contract/get-installment";
import { jsonLottery } from "./services/uploadIPFS";
import useMintLottery from "./services/contract/buy-lottery";
import { BigNumber, ethers } from "ethers";
import { startTransition } from "react";

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

      const uriFrom = await jsonLottery(number, installment);
      if (uriFrom !== undefined) {
        setUri(uriFrom);
        console.log("URI:", uriFrom);

        console.log("uri ก่อน คือ", uri);
        if (uri !== "") {
          await handleMintLottery();
          console.log("uri หลัง คือ", uri);
        } else {
          console.log("uri ไม่เข้าอ่า");
        }

        // Do something with the returned URI
      } else {
        // Handle the case where uriFrom is undefined
        console.log("URI is undefined.");
      }
    } catch (error) {
      console.log("Error calling jsonLottery:", error);
    }
  };

  // const parsedLotteryNumber = lotteryNumber
  //   ? ethers.BigNumber.from(lotteryNumber)
  //   : ethers.constants.Zero;

  const {
    data: mintData,
    isError: mintError,
    isLoading: mintLoading,
    isSuccess: mintStarted,
    write,
  } = useMintLottery(
    address as Address,
    // ethers.BigNumber.from(lotteryNumber),
    lotteryNumber
    ? ethers.BigNumber.from(lotteryNumber)
    : ethers.constants.Zero,
    uri
  );

  const handleMintLottery = async () => {
    try {
      if (write) {
        console.log("uri ข้างในคือ", uri);
        await write();
        console.log("Transaction successful");
      } else {
        console.log("write is undefined");
      }
      setLotteryNumber("");
      setUri("");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    mounted && (
      <>
        <div className="grid grid-cols-2 gap-10 mt-5 h-screen place-content-center">
          <div className="flex flex-col justify-center items-end ">
            <FlipCard>
              <FrontCard isCardFlipped={mintStarted}>
                <Image
                  layout="responsive"
                  src={NFT}
                  width="500"
                  height="500"
                  alt="RainbowKit Demo NFT"
                />
                <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
              </FrontCard>
              <BackCard isCardFlipped={mintStarted}>
                <div style={{ padding: 24 }}>
                  {/* <Image
                    src="/nft.png"
                    width="80"
                    height="80"
                    alt="RainbowKit Demo NFT"
                    style={{ borderRadius: 8 }}
                  /> */}
                  <div style={{ marginTop: 24, marginBottom: 6 }}>
                    คุณซื้อลอตเตอรี่เสร็จเรียบร้อยแล้ว
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    กำลังบันทึกลอตเตอรี่สักครู่...
                  </div>

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
          <div className="flex flex-col justify-center items-start text-topic text-center gap-4 ">
            <div className="flex flex-col gap-5 items-center">
              <div className="font-bold text-2xl">
                ซื้อลอตเตอรี่งวดที่ {parseInt(installmentFromContract)}{" "}
                ได้ที่นี่
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
                className="btn bg-primary text-secondary rounded-lg border-none"
                onClick={handleJsonLottery}
                type="submit"
                disabled={mintLoading}
              >
                ซื้อเลย!
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
