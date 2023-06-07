import React, { useEffect, useState } from "react";
import GetInstallment from "./services/contract/get-installment";
import { useAccount, useContractRead } from "wagmi";
import { getOwnerNFTs } from "./services/moralis";
import { parse } from "json5";
import GetCheckReward from "./services/contract/get-check-reward";
import type { Address } from "wagmi";
import { lottofactoryabi } from "../../abi/lotto-factory";
import { ethers } from "ethers";

interface NFTMetadata {
  number: string;
  installment: string;
}

const MyLotteryPage = () => {
  const { address } = useAccount();
  const { data, isError, isLoading } = GetInstallment();
  const [mounted, setMounted] = useState(false);
  const [lotteryNumber, setLotteryNumber] = useState("");
  const [installmentNumber, setInstallmentNumber] = useState("");
  const [reward, setReward] = useState("test");

  const { data: useContractReadData } = useContractRead({
    address: process.env.NEXT_PUBLIC_LOTTO_FACTORY as Address,
    abi: lottofactoryabi,
    functionName: "checkReward",
    args: [
      address as Address,
      installmentNumber
        ? ethers.BigNumber.from(installmentNumber)
        : ethers.constants.Zero,
      lotteryNumber
        ? ethers.BigNumber.from(lotteryNumber)
        : ethers.constants.Zero,
    ],
    watch: true,
  });

  useEffect(() => {
    setMounted(true);
    console.log("__________________________");
    console.log("useContractReadData", useContractReadData);
    setReward(useContractReadData || "");
    console.log("__________________________");
  }, [useContractReadData]);

  const [tokenIds, setTokenIds] = useState([]);
  const [metadata, setMetadata] = useState(null);

  const handleLotteryNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLotteryNumber(event.target.value);
  };

  const handleInstallmentNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstallmentNumber(event.target.value);
  };

  // useEffect(() => {
  //   // Trigger the GetCheckReward hook whenever installmentNumber or lotteryNumber changes
  //   GetCheckReward(address as Address, installmentNumber, lotteryNumber);
  // }, [address, installmentNumber, lotteryNumber]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const nfts = await getOwnerNFTs(
        address as string,
        process.env.NEXT_PUBLIC_LOTTO_TOKEN as string
      );

      const ids = nfts.map((nft) => nft.token_id);
      setTokenIds(ids.reverse());

      const metadataArray = nfts.map((nft) => {
        const parsedMetadata = parse(nft.metadata);
        return {
          number: parsedMetadata.number,
          installment: parsedMetadata.installment,
        };
      });

      setMetadata(metadataArray);
    };

    fetchNFTs();
  }, [address]);

  const installment = data && data._hex;

  return (
    mounted && (
      <>
        <div className="max-w-2xl px-4 py-16 mx-auto rounded-lg sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="font-body font-bold text-4xl text-topic">
            ลอตเตอรี่ของฉัน
          </div>
          <div className="flex items-center gap-5">
            <div className="text-primary font-bold  text-xl">
              ทำการเช็คลอตเตอรี่ที่นี่ :
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              placeholder="ใส่หมายเลขลอตเตอรี่"
              className="input max-w-xs shadow-md text-primary text-center"
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
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              placeholder="ใส่งวด"
              className="input max-w-xs shadow-md text-primary text-center"
              id="lotteryNumber"
              name="lotteryNumber"
              value={installmentNumber}
              onChange={handleInstallmentNumberChange}
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
              // onClick={handleCheckReward}
              type="submit"
              // disabled={mintLoading}
            >
              ตรวจลอตเตอรี่เลย!
            </button>
          </div>
          {reward !== "" && reward !== "0" ? (
            <div className="text-green">{"คุณถูกรางวัลที่ :  " + reward}</div>
          ) : reward === "0" ? (
            <div className="text-red">{"คุณไม่ถูกรางวัล"}</div>
          ) : (
            <div className="text-primary">{""}</div>
          )}
          {/* {reward === "" && useContractReadData === undefined && (
            <div className="text-red">{"คุณไม่ถูกรางวัล"}</div>
          )} */}
          {reward === undefined && useContractReadData !== undefined && (
            <div>Loading...</div>
          )}
          {/* <div className="text-topic">Installment: {installment}</div>
         

          <button
            onClick={() =>
              getOwnerNFTs(
                address as string,
                process.env.NEXT_PUBLIC_LOTTO_TOKEN as string
              )
            }
          >
            showNFTs
          </button> */}

          {metadata && (
            <div>
              {metadata.map((data, index) => (
                <div key={index}>
                  <div className="card w-100 glass mt-6 shadow-md">
                    <div className="card-body items-center ">
                      <div className="text-topic">
                        หมายเลขลอตเตอรี่: {data.number}
                      </div>
                      <div className="text-topic">
                        งวดที่ซื้อ: {parseInt(data.installment)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    )
  );
};

export default MyLotteryPage;
