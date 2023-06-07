import { useContractRead } from "wagmi";

import type { Address } from "wagmi";
import { ethers } from "ethers";
import { lottofactoryabi } from "../../../../abi/lotto-factory";

const GetInstallment = () => {
  const { data, isLoading, isError, isSuccess } = useContractRead({
    address: process.env.NEXT_PUBLIC_LOTTO_FACTORY as Address,
    abi: lottofactoryabi,
    functionName: "getInstallment",
    // args: [owner as Address, ethers.BigNumber.from(installment)],
  });

  return { data: data!, isError, isLoading };
};

export default GetInstallment;
