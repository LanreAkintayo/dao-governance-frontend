import Link from "next/link";
import { CryptoCards, Button } from "@web3uikit/core";
import { ConnectButton } from "web3uikit";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
// import NavigationDropdown from "./NavigationDropdown";
import { useEffect, useState, useCallback } from "react";
import { useMoralis, useWeb3Contract, useChain } from "react-moralis";

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: { matches: any; }) => {
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
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const { switchNetwork, chain, account } = useChain();

  // console.log(chainIdHex)
  const chainId = parseInt(chainIdHex!);
  // console.log("Chain id", chainId)
  // console.log("Here am I:", chainId != 80001)

  useEffect(() => {
    console.log("Collapsing: ", collapsed);
  }, [collapsed]);


  const handleSidebar = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <div className={`fixed z-50 top-0 left-0 bg-gray-100 ss:${chainId != 80001 ? "h-30" : "h-20"} h-30 w-screen `}>
      {/* Navbar */}

      {!collapsed && isBreakpoint && (
        <div className={`z-50 h-screen ${!collapsed && "fixed inset-0"}`}>
          <ProSidebar
            collapsedWidth="0px"
            collapsed={collapsed}
          >
            <div
              className="px-4 pt-4 w-full text-end cursor-pointer text-xl"
              onClick={handleSidebar}
            >
              X
            </div>
            <Menu iconShape="square">
              <div className="text-xl text-white hover:text-orange-700">
                <MenuItem>
                  <Link href="/"><p className="text-xl">Home</p></Link>
                </MenuItem>
              </div>
              <MenuItem>
                <Link href="/token"><p className="text-xl">Get LAR Token</p></Link>
              </MenuItem>
              <MenuItem>
                <Link href="/create"><p className="text-xl">Create Proposal</p></Link>
              </MenuItem>
              <MenuItem>
                <Link href="/proposals"><p className="text-xl">Vote</p></Link>
              </MenuItem>
            </Menu>
          </ProSidebar>
        </div>
      )}

      <nav className="flex items-center flex-col ss:flex-row w-full justify-between ss:px-2 py-2 sm:px-4 sm:py-4 h-full text-black ">
        <p className="font-logo text-xl  sm:text-3xl self-start ss:self-auto">
          <span className="text-orange-700">{"<"}L</span>arry
          <span className="text-orange-700">C</span>odes
          <span className="text-orange-700">{"/>"}</span>
        </p>
        <div className="flex items-center text-black self-end ss:self-auto">
          <div className="flex items-center text-base w-full">
            {!isBreakpoint && (
              <>
                <Link href="/  ">
                  <a className="w-full text-black font-semibold hover:text-orange-700">
                    <p className="w-full whitespace-nowrap">Home</p>
                  </a>
                </Link>
                <Link href="/token  ">
                  <a className="sm:ml-5 w-full text-black font-semibold hover:text-orange-700">
                    <p className="w-full whitespace-nowrap">Get LAR Token</p>
                  </a>
                </Link>
                <Link href="/create">
                  <a className="sm:ml-5 ml-6 text-black font-semibold whitespace-nowrap hover:text-orange-700">
                    Create Proposal
                  </a>
                </Link>

                <Link href="/proposals">
                  <a className="sm:ml-5 mx-2 w-full text-black font-semibold hover:text-orange-700 ">
                    Vote
                  </a>
                </Link>
              </>
            )}
          
            <div className="text-white flex flex-col w-full sc:py-10 items-start">
             
              <div className="px-0">
                <ConnectButton  />
              </div>
              {chainId != 80001 && isWeb3Enabled && (
                <button
                  className=" ml-4 text-red-700 text-sm my-2 cursor-pointer bg-red-100 rounded-lg p-1 px-2"
                  onClick={() => {
                    switchNetwork("0x13881");
                  }}
                >
                  Switch to Mumbai
                </button>
              )}
            </div>
            { isBreakpoint && (
              <div
                className="w-8 h-8 mr-11 text-black hover:text-orange-500 cursor-pointer"
                onClick={handleSidebar}
              >
                
                <img
                  alt="..."
                  src="/menubar.svg"
                  className="object-cover w-full h-full cursor-pointer hover:text-orange-500"
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
