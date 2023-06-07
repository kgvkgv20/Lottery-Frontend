import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, sepolia } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";
import Layout from "@/components/Layout";
// import Layout from "@/components/Layout";

const { chains, provider } = configureChains(
  [mainnet, goerli, sepolia],
  // [alchemyProvider({ apiKey: process.env.ALCHEMY_ID || "" }), publicProvider()]
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Thai Lottery",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
