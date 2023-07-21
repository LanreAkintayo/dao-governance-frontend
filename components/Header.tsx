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
import { FaBars } from "react-icons/fa";

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
      className={`fixed bg-black bg-gradient-to-r from-[#0D1321] via-[#0D1321] to-[#11264d]  z-50 top-0 left-0 ss:${
        true ? "h-30" : "h-20"
      } h-30 w-screen `}
    >
      {/* Navbar */}

      {!collapsed && isBreakpoint && (
        <div className={`z-50 h-screen ${!collapsed && "fixed inset-0"}`}>
          <ProSidebar collapsedWidth="0px" collapsed={collapsed}>
            <div
              className="px-4 pt-4 w-full text-end cursor-pointer text-xl"
              onClick={handleSidebar}
            >
              X
            </div>
            <Menu iconShape="square">
              <div className="text-xl text-white hover:text-orange-700">
                <MenuItem>
                  <Link href="/">
                    <p className={`text-[16px] text-white ${currentUrl == "/" && "border-b-2 border-orange-700"}`}>Home</p>
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
                <Link href="/proposals">
                  <p className="text-[16px]">Vote</p>
                </Link>
              </MenuItem>
            </Menu>
          </ProSidebar>
        </div>
      )}

      <nav className="flex items-center flex-col ss:flex-row w-full justify-between ss:px-2 py-2 sm:px-4 sm:py-4 h-full">
        <p className="font-logo text-xl text-white sm:text-3xl self-start ss:self-auto">
          <span className="text-orange-700">{"<"}L</span>arry
          <span className="text-orange-700">C</span>odes
          <span className="text-orange-700">{"/>"}</span>
        </p>
        <div className="flex items-center text-black self-end  ss:self-auto">
          <div className="flex items-center self-center text-base w-full">
            {!isBreakpoint && (
              <>
                <Link href="/  ">
                  <a className={`w-full text-white font-semibold ${currentUrl == "/" && "border-b-2 border-orange-700"} hover:text-orange-700`}>
                    <p className="w-full whitespace-nowrap">Home</p>
                  </a>
                </Link>
                <Link href="/token  ">
                  <a className={`sm:ml-5 w-full text-white ${currentUrl == "/token" && "border-b-2 border-orange-700"} font-semibold hover:text-orange-700`}>
                    <p className="w-full whitespace-nowrap">Get LAR Token</p>
                  </a>
                </Link>
                <Link href="/create">
                  <a className={`sm:ml-5 ml-6 text-white font-semibold whitespace-nowrap ${currentUrl == "/create" && "border-b-2 border-orange-700"}  hover:text-orange-700`}>
                    Create Proposal
                  </a>
                </Link>

                <Link href="/proposals">
                  <a className={`sm:ml-5 mx-2 w-full ${currentUrl == "/proposals" && "border-b-2 border-orange-700"}  text-white font-semibold hover:text-orange-700`}>
                    Vote
                  </a>
                </Link>
              </>
            )}

            
          </div>

         
        </div>
        <div className="flex mx-2 items-center">

<div className=" text-white flex items-center w-full sc:py-10">
  <WalletConnect />
  {chainId && chainId != supportedChainId && (
    <button
      className="text-red-700 text-sm my-2 cursor-pointer bg-red-100 rounded-lg p-1 px-2"
      onClick={async () => {
        try {

          // const chainIds = await window.ethereum.request({ method: 'eth_chainId' });

          // console.log("ChainID: ", chainIds)

          // const walletClient = createWalletClient({
          //   chain: polygonMumbai,
          //   transport: custom(window.ethereum)
          // })

          // await walletClient.addChain({ chain: polygonMumbai }) 

          await switchNetwork({
            chainId: supportedChainId,
          });
        } catch (err) {
          console.log("Error", err);

          displayToast("failure", "Make sure you add Polygon Mumbai testnet with a chain id of 80001")
        }
      }}
    >
      Switch to Mumbai
    </button>
  )}
</div>
{isBreakpoint && (
  <div
    className="text-white rounded-full hover:text-orange-500 cursor-pointer"
    onClick={handleSidebar}
  >
    <FaBars/>
  </div>
)}
</div>
      </nav>
    </div>
  );
}
