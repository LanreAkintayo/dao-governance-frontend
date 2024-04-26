import Link from "next/link";
// import { CryptoCards, Button } from "@web3uikit/core";
// import { ConnectButton } from "web3uikit";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
// import NavigationDropdown from "./NavigationDropdown";
import { useEffect, useState, useCallback, useRef } from "react";
import WalletConnect from "./WalletConnect";
import { getAccount, getNetwork, switchNetwork } from "@wagmi/core";
import { supportedChainId } from "../constants";
import { createWalletClient, custom } from "viem";
import { mainnet, avalanche, polygonMumbai, zkSync } from "viem/chains";
import useProposals from "../hooks/useProposals";
import { displayToast } from "./Toast";
import { useRouter } from "next/router";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Image from "next/image";

// import { useMoralis, useWeb3Contract, useChain } from "react-moralis";

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: { matches: any }) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};

export default function Header() {
  const [collapsed, setCollapsed] = useState(true);
  const isBreakpoint = useMediaQuery(912);
  const { chainId } = useProposals();
  const router = useRouter();
  const currentUrl = router.asPath;

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    console.log("Show sidebar: ", showSidebar);
  }, [showSidebar]);
  // const sidebarRef = useRef(null);

  // const handleDocumentClick = (event: MouseEvent) => {
  //   if (
  //     sidebarRef.current &&
  //     !sidebarRef.current.contains(event.target as Node)
  //   ) {
  //      setCollapsed((prevCollapsed) => false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleDocumentClick);
  //   return () => {
  //     document.removeEventListener("click", handleDocumentClick);
  //   };
  // }, []);

  console.log("Current url:: ", currentUrl);

  useEffect(() => {
    console.log("There is a change in the id", chainId);
  }, [chainId]);

  useEffect(() => {
    console.log("Collapsing: ", collapsed);
  }, [collapsed]);

  const handleSidebar = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  // console.log("SidebarRef.Current: ",sidebarRef.current)
  return (
    <div
      className={`fixed  bg-gradient-to-r from-red-50 via-red-100 to-red-100   z-50 top-0 left-0 ss:${
        true ? "h-30" : "h-20"
      } h-30 w-screen `}
    >
      {showSidebar && isBreakpoint && (
        <Sidebar
          showSidebar={showSidebar}
          closeSidebar={() => setShowSidebar(false)}
        />
      )}

      <nav className=" px-2 flex items-center flex-row w-full justify-between ss:justify-between ss:px-2 py-1 sm:px-4 sm:py-3 h-full">
        <div className="ssm:block hidden">
          <Image
            src="/my_logo.svg"
            width={200}
            height={30}
            className="object-cover p-0"
          />
        </div>

        <div className="block ssm:hidden">
          <Image
            src="/my_icon.svg"
            width={40}
            height={30}
            className="object-cover p-0"
          />
        </div>

        <div className="flex items-center text-black self-end  ss:self-auto">
          <div className="flex items-center self-center text-base w-full">
            {!isBreakpoint && (
              <>
                <Link href="/">
                  <a
                    className={`w-full text-gray-800 font-semibold ${
                      currentUrl == "/" && "border-b-2 border-red-800"
                    } hover:text-red-800`}
                  >
                    <p className="w-full whitespace-nowrap">Home</p>
                  </a>
                </Link>
                <Link href="/token  ">
                  <a
                    className={`sm:ml-5 w-full text-gray-800 ${
                      currentUrl == "/token" && "border-b-2 border-red-800"
                    } font-semibold hover:text-red-800`}
                  >
                    <p className="w-full whitespace-nowrap">Get LAR Token</p>
                  </a>
                </Link>
                <Link href="/create">
                  <a
                    className={`sm:ml-5 ml-6 text-gray-800 font-semibold whitespace-nowrap ${
                      currentUrl == "/create" && "border-b-2 border-red-800"
                    }  hover:text-red-800`}
                  >
                    Create Proposal
                  </a>
                </Link>

                <Link href="/proposals">
                  <a
                    className={`sm:ml-5 mx-2 w-full ${
                      currentUrl == "/proposals" && "border-b-2 border-red-800"
                    }  text-gray-800 font-semibold hover:text-red-800`}
                  >
                    Vote
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex mx-2 items-center">
          <div className=" text-gray-800 flex items-center w-full sc:py-10">
            <WalletConnect />
          </div>
          {isBreakpoint && (
            <div
              className="text-gray-800 rounded-full hover:text-red-500 cursor-pointer"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <FaBars className="ml-3 w-9 h-9 bg-red-200 rounded-full text-black p-2" />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
