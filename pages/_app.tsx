import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { avalanche, zkSync, sepolia } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import ProposalsProvider from "../providers/ProposalsProvider";
import { NextPageWithLayout } from "../types";
import { webSocket, createPublicClient, http } from "viem";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { publicProvider } from "wagmi/providers/public";

// https://github.com/wevm/viem/issues/923

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

// // 2. Configure wagmi client
// const chains = [sepolia];

// const { publicClient } = configureChains(chains,  [w3mProvider({ projectId })]);

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ chains, projectId }),
//   publicClient
// });

// // 3. Configure modal ethereum client
// const ethereumClient = new EthereumClient(wagmiConfig, chains);

//////////
const { chains } = configureChains([sepolia], [publicProvider()]);

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(rpcUrl),
});

const { connectors } = getDefaultWallets({
  appName: "Dao Governance",
  projectId: projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

///////////

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains}>
        <ProposalsProvider>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer />
        </ProposalsProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
