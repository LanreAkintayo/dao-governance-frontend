import Link from "next/link";
// import { CryptoCards, Button } from "@web3uikit/core";
// import { ConnectButton } from "web3uikit";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
// import NavigationDropdown from "./NavigationDropdown";
import { useEffect, useState, useCallback } from "react";
import WalletConnect from "./WalletConnect";
import { getAccount, getNetwork, switchNetwork } from "@wagmi/core";
import { supportedChainId } from "../constants";
import { createWalletClient, custom } from 'viem'
import { mainnet, avalanche, polygonMumbai, zkSync } from 'viem/chains'
import useProposals from "../hooks/useProposals";
import { displayToast } from "./Toast";
import { useRouter } from 'next/router';
import { FaBars, FaTimes } from "react-icons/fa";

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
  // const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  // const { switchNetwork, chain, account } = useChain();

  // console.log(chainIdHex)
  // const chainId = parseInt(chainIdHex!);
  // console.log("Chain id", chainId)
  // console.log("Here am I:", chainId != 80001)
  // const { chain, chains } = getNetwork();

  // const chainId = chain?.id

  const {chainId} = useProposals()
  const router = useRouter();
  const currentUrl = router.asPath;

  console.log("Current url:: ", currentUrl)




  useEffect(() => {

    console.log("There is a change in the id", chainId)

  }, [chainId])

  useEffect(() => {
    console.log("Collapsing: ", collapsed);
  }, [collapsed]);

  const handleSidebar = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <div
      className={`fixed  bg-gradient-to-r from-red-50 via-red-100 to-red-100   z-50 top-0 left-0 ss:${
        true ? "h-30" : "h-20"
      } h-30 w-screen `}
    >
      {/* Navbar */}

      {!collapsed && isBreakpoint && (
        <div className={`z-50 h-screen ${!collapsed && "fixed  inset-0"}`}>
          <ProSidebar collapsedWidth="0px" collapsed={collapsed}>
            <div
              className="px-4 pt-4 w-full flex justify-end cursor-pointer "
              onClick={handleSidebar}
            >
              <FaTimes />
            </div>
            <Menu iconShape="square" className="">
              <div className="text-xl text-gray-800 hover:text-red-800">
                <MenuItem>
                  <Link href="/">
                    <p
                      className={`text-[16px] text-gray-800 ${
                        currentUrl == "/" && "border-b-2 border-red-800"
                      }`}
                    >
                      Home
                    </p>
                  </Link>
                </MenuItem>
              </div>
              <MenuItem>
                <Link href="/token">
                  <p className="text-[16px]">Get LAR Token</p>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/create">
                  <p className="text-[16px]">Create Proposal</p>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/allproposals">
                  <p className="text-[16px]">Vote</p>
                </Link>
              </MenuItem>
            </Menu>
          </ProSidebar>
        </div>
      )}

      <nav className="flex items-center flex-row w-full justify-end ss:justify-between ss:px-2 py-2 sm:px-4 sm:py-4 h-full">
        <p className="font-logo text-xl text-gray-800 sm:text-3xl self-start ss:self-auto hidden ssm:block">
          <span className="text-red-800">{"<"}L</span>arry
          <span className="text-red-800">C</span>odes
          <span className="text-red-800">{"/>"}</span>
        </p>
        <div className="flex items-center text-black self-end  ss:self-auto">
          <div className="flex items-center self-center text-base w-full">
            {!isBreakpoint && (
              <>
                <Link href="/  ">
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

                <Link href="/allproposals">
                  <a
                    className={`sm:ml-5 mx-2 w-full ${
                      currentUrl == "/allproposals" && "border-b-2 border-red-800"
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
              onClick={handleSidebar}
            >
              <FaBars className="ml-3 w-9 h-9 bg-red-200 rounded-full text-black p-2" />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
