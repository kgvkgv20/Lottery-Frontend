import Moralis from "moralis";
interface responseNFT {
  owner_of?: string;
  contract_type?: string;
  name?: string;
  symbol?: string;
}

export const getOwnerNFTs = async (
  walletAddress: string,
  TokenAddress: string
) => {
  if (!Moralis.Core.isStarted) {
    Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORAILS_API,
    });
  }
  const chain = "11155111";
  const address = TokenAddress;
  const response = await Moralis.EvmApi.nft.getNFTOwners({
    address,
    chain,
  });
  let result = [];
  let data = (await response?.toJSON()?.result) as responseNFT[];
  for await (let item of data) {
    const wallet_address = await item.owner_of?.toString().trim();
    if (walletAddress.toLowerCase() === wallet_address) {
      result.push(item);
    }
  }
  console.log(result);
  return result;
};
