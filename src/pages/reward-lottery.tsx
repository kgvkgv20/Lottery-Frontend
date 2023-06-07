import { Address, useAccount, useContractRead } from "wagmi";
import GetReward from "./services/contract/get-reward";
import GetWalletLotto from "./services/contract/get-wallet-lotto";
import { lottofactoryabi } from "../../abi/lotto-factory";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function RewardLotteryPage() {
  const { address } = useAccount();
  const [installmentNumber, setInstallmentNumber] = useState("0");
  const [mounted, setMounted] = useState(false);
  const { data: useContractReadData } = useContractRead({
    address: process.env.NEXT_PUBLIC_LOTTO_FACTORY as Address,
    abi: lottofactoryabi,
    functionName: "getReward",
    args: [ethers.BigNumber.from(installmentNumber)],
    watch: true,
  });
  const handleInstallmentNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstallmentNumber(event.target.value);
  };
  const [storedData, setStoredData] = useState<string[]>([]);
  useEffect(() => {
    setMounted(true);
    console.log("__________________________");
    console.log("useContractReadData", useContractReadData);
    console.log("__________________________");

    if (useContractReadData !== undefined) {
      const data: string[][] = []; // Update the type of data

      useContractReadData.forEach((innerArray) => {
        const innerData: string[] = []; // Declare innerData for each innerArray
        innerArray.forEach((item, index) => {
          console.log(item); // Log the item itself
          innerData.push(item._hex); // Convert the object to string and store the _hex property in the innerData array
        });
        data.push(innerData); // Store the innerData array in the data array
      });

      setStoredData(data); // Update the storedData state with the data array
    }
  }, [useContractReadData]);
  // console.log("useContractReadData อันหลัง", useContractReadData);
  console.log("StoreData อันหลัง", storedData);

  // const cards = [];
  // if (storedData !== undefined) {
  //   for (let i = 0; i < storedData[0].length; i++) {
  //     const item = [
  //       storedData[0][i],
  //       storedData[1][i],
  //       // storedData[2][i],
  //       // storedData[3][i],
  //       // storedData[4][i],
  //     ];
  //     cards.push(
  //       <div className="card w-100 glass mt-6 shadow-md" key={i}>
  //         {/* Content of the card */}
  //         <div className="card-body">
  //           <div className="flex flex-wrap justify-between">
  //             <div className="my-auto font-bold text-lg text-topic">
  //               พินัยกรรมเลขที่ : {item[3]}
  //             </div>
  //           </div>
  //           <div className="border-t"></div>
  //           <div></div>
  //         </div>
  //       </div>
  //     );
  //   }
  // } else {
  //   // Handle the case when the arrays within storedData have different lengths
  //   <div className="font-body font-bold text-4xl text-topic text-center">
  //     ไม่มีพินัยกรรมของคุณที่บันทึกไว้
  //   </div>;
  // }

  return (
    mounted && (
      <>
        <div className="max-w-2xl px-4 py-16 mx-auto rounded-lg sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 h-screen">
          <div className="flex flex-wrap justify-between">
            <div className="font-body font-bold text-4xl text-topic">
              ลอตเตอรี่ที่ออกรางวัลงวดที่ : {installmentNumber}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                placeholder="ใส่เลขงวดที่คุณต้องการจะดูรางวัล"
                className="input w-full max-w-xs shadow-md text-primary text-center"
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
              {/* <button
                className="btn bg-primary text-secondary rounded-lg"
                onClick={handleSearch}
                type="submit"
              >
                ค้นหา
              </button> */}
            </div>
          </div>

          {/* <div>
            {storedData.map((data, index) => (
              <div className="card w-100 glass mt-6 shadow-md" key={index}>
                <div className="card-body">
                  <div className="text-topic font-bold text-lg">
                    {" "}
                    รางวัลที่ {index + 1}
                  </div>
                  <div className="border-t"></div>
                  <div className="flex flex wrap gap-2">
                    {data.map((item, itemIndex) => (
                      <div className="text-primary" key={itemIndex}>
                        {parseInt(item)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          <div className="overflow-x-auto">
            <div className="flex flex-wrap gap-4 min-w-full">
              {storedData.map((data, index) => (
                <div
                  className="card w-100 glass mt-6 shadow-md"
                  key={index}
                >
                  <div className="p-4">
                    <div className="font-bold text-lg text-topic">
                      รางวัลที่ {index + 1}
                    </div>
                    <div className="border-t my-2 text-secondary"></div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {data.map((item, itemIndex) => (
                        <div className="text-primary" key={itemIndex}>
                          {parseInt(item)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  );
}
