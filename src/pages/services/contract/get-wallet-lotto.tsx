import { useContractRead } from "wagmi";

import type { Address } from "wagmi";
import { ethers } from "ethers";
import { lottofactoryabi } from "../../../../abi/lotto-factory";

const GetWalletLotto = (installment: string) => {
  const { data, isLoading, isError, isSuccess } = useContractRead({
    address: process.env.NEXT_PUBLIC_LOTTO_FACTORY as Address,
    abi: lottofactoryabi,
    // functionName: "getReward",
    // args: [ethers.BigNumber.from(installment)],
    functionName: "getWalletLotto",
    args: [
      "0x34DEC1CDd3040d7904B9B891F0388997525704eD" as Address,
      ethers.BigNumber.from(installment),
    ],
  });
  console.log("Reward data:", data);
  console.log("isLoading,:", isLoading);
  console.log("isError:", isError);
  console.log("isSuccess:", isSuccess);
  return { data: data!, isError, isLoading };
};

export default GetWalletLotto;
