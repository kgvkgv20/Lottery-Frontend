import {
  useContractRead,
} from "wagmi";

import type { Address } from "wagmi";
import { ethers } from "ethers";
import { lottofactoryabi } from "../../../../abi/lotto-factory";

const GetReward = (installment: string) => {
  const { data, isLoading, isError, isSuccess } = useContractRead({
    address: process.env.NEXT_PUBLIC_LOTTO_FACTORY as Address,
    abi: lottofactoryabi,
    functionName: "getReward",
    args: [ethers.BigNumber.from(installment)],
  });
  console.log("Reward data:", data);
  return { data: data!, isError, isLoading };
};

export default GetReward;
