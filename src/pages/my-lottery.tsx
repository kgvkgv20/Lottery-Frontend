import React, { useEffect, useState } from "react";
import GetInstallment from "./services/contract/get-installment";
import { useAccount } from "wagmi";
import { getOwnerNFTs } from "./services/moralis";
import { parse } from "json5";

interface NFTMetadata {
  number: string;
  installment: string;
}

const MyLotteryPage = () => {
  const { data, isError, isLoading } = GetInstallment();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { address } = useAccount();
  const [tokenIds, setTokenIds] = useState([]);
  const [metadata, setMetadata] = useState(null);

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
        <div className="max-w-2xl px-4 py-16 mx-auto rounded-lg sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 h-screen">
          <div className="font-body font-bold text-4xl text-topic">
            ลอตเตอรี่ของฉัน
          </div>
          <div className="text-topic">Installment: {installment}</div>
          {/* Additional rendering or logic */}

          <button
            onClick={() =>
              getOwnerNFTs(
                address as string,
                process.env.NEXT_PUBLIC_LOTTO_TOKEN as string
              )
            }
          >
            showNFTs
          </button>

          {/* <div>
            {tokenIds.map((tokenId) => (
              <div key={tokenId}>
                <div className="card w-100 glass mt-6 shadow-md">
                  <div className="card-body items-center ">
                    <div className="text-topic">{tokenId}</div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

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
