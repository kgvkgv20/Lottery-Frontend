import { useContractRead } from "wagmi";

import type { Address } from "wagmi";
import { ethers } from "ethers";
import { lottofactoryabi } from "../../../../abi/lotto-factory";

const GetReward = (installment: string) => {
  const { data, isLoading, isError, isSuccess } = useContractRead({
    // address: process.env.NEXT_PUBLIC_LOTTO_FACTORY as Address,
    address: "0x799087Cb7e416667AD9712bAFC07eb7b6Bb71E2C" as Address,
    abi: lottofactoryabi,
    functionName: "getReward",
    args: [ethers.BigNumber.from(installment)],
    watch: true,
  });
  console.log("Reward data:", data);
  console.log("isLoading,:", isLoading);
  console.log("isError:", isError);
  console.log("isSuccess:", isSuccess);
  return { data: data!, isError, isLoading };
};

export default GetReward;
