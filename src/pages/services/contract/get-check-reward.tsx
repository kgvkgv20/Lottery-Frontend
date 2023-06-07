import { useContractRead } from "wagmi";

import type { Address } from "wagmi";
import { BigNumber, ethers } from "ethers";
import { lottofactoryabi } from "../../../../abi/lotto-factory";

const GetCheckReward = (
  owner: string,
  installment: string,
  lotteryNumber: string
) => {
  const { data, isLoading, isError, isSuccess } = useContractRead({
    address: process.env.NEXT_PUBLIC_LOTTO_FACTORY as Address,
    abi: lottofactoryabi,
    functionName: "checkReward",
    args: [
      owner as Address,
      installment ? ethers.BigNumber.from(installment) : ethers.constants.Zero,
      lotteryNumber
        ? ethers.BigNumber.from(lotteryNumber)
        : ethers.constants.Zero,
    ],
    watch: true,
  });

  return { data: data!, isError, isLoading };
};

export default GetCheckReward;
