import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import type { AppProps } from "next/app";
import { NotificationProvider } from "web3uikit";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID!}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}
    >
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
  );
}

export default MyApp;
