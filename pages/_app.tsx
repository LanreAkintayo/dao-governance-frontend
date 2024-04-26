import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import {  avalanche, zkSync, sepolia } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import ProposalsProvider from "../providers/ProposalsProvider";
import { NextPageWithLayout } from "../types";

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Configure wagmi client
const chains = [sepolia];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ProposalsProvider>
        <WagmiConfig config={wagmiConfig}>
          {getLayout(<Component {...pageProps} />)}
        </WagmiConfig>

        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

        <ToastContainer />
      {/* </NotificationProvider> */}
    </ProposalsProvider>
  );
}

export default MyApp;
