import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { lottofactoryabi } from "../../../../abi/lotto-factory";
import type { Address } from "wagmi";
import { BigNumber, ethers } from "ethers";

const useMintLottery = (buyer: string, number: BigNumber, uri: string) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_LOTTO_FACTORY as Address,
    abi: lottofactoryabi,
    functionName: "buyLotto",
    args: [
      buyer as Address,
      //   ethers.BigNumber.from(installment),
      BigNumber.from(number),
      uri,
    ],
    overrides: {
      value: ethers.utils.parseEther("0.001"),
    },
  });

  const { data, isLoading, isError, isSuccess, write } =
    useContractWrite(config);

  return { data, isLoading, isError, isSuccess, write };
};

// {
//   value: ethers.utils.parseEther("0.1"),
// }

export default useMintLottery;
