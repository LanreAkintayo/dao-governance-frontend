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

  const updateTarget = useCallback((e) => {
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

  useEffect(() => {
    console.log(collapsed);
  }, [collapsed]);
  const handleSidebar = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <div className={` absolute left-0 top-0 ss:${chainId != 97 ? "h-30" : "h-20"} h-30 w-screen `}>
      {/* Navbar */}

      {!collapsed && isBreakpoint && (
        <div className={`z-50 h-screen ${!collapsed && "fixed inset-0"}`}>
          {/* <ProSidebar
            breakPoint="xxl"
            open={false}
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
              <div className="text-xl text-white hover:text-green-700">
                <MenuItem>
                  <Link href="/"><p className="text-2xl">Home</p></Link>
                </MenuItem>
              </div>
              <MenuItem>
                <Link href="/projects"><p className="text-2xl">Projects</p></Link>
              </MenuItem>
              <MenuItem>
                <Link href="/launch"><p className="text-2xl">Get Funded</p></Link>
              </MenuItem>
            </Menu>
          </ProSidebar> */}
        </div>
      )}

      <nav className="flex items-center flex-col ss:flex-row w-full justify-between px-2 py-2 sm:px-4 sm:py-4 h-full text-black ">
        <p className="font-logo text-xl sm:text-3xl self-start ss:self-auto">
          <span className="text-orange-700">{"<"}L</span>arry
          <span className="text-orange-700">C</span>odes
          <span className="text-orange-700">{"/>"}</span>
        </p>
        <div className="flex  items-center text-black ss:self-auto">
          <div className="flex items-center text-lg w-full">
            {!isBreakpoint && (
              <>
                <Link href="/">
                  <a className="w-full text-black font-semibold hover:text-green-500 sm:text-xl text-lg">
                    <p className="w-full whitespace-nowrap">Get LAR</p>
                  </a>
                </Link>
                <Link href="/projects">
                  <a className="sm:ml-8 ml-6 text-black font-semibold hover:text-green-500">
                    Proposals
                  </a>
                </Link>

                <Link href="/launch">
                  <a className="sm:mx-4 mx-2 w-full text-black font-semibold hover:text-green-500 ">
                    Proposals
                  </a>
                </Link>
              </>
            )}

            <div className="text-white flex flex-col w-full sc:py-10 items-start">
              {/* <Button type="button" text="Connect Wallet" /> */}
              <div className="px-0">
                {" "}
                {/* <ConnectButton text="This is a button" /> */}
              </div>
              {chainId != 97 && isWeb3Enabled && (
                <button
                  className=" ml-4 text-red-700 text-sm my-2 cursor-pointer bg-red-100 rounded-lg p-1 px-2"
                  onClick={() => {
                    switchNetwork("0x61");
                  }}
                >
                  Switch to BSC Testnet
                </button>
              )}
            </div>
            {/* {isBreakpoint && (
              <div
                className="w-8 h-8 text-white hover:text-green-500 cursor-pointer"
                onClick={handleSidebar}
              >
                <img
                  alt="..."
                  src="./menubar.svg"
                  className="object-cover w-full h-full cursor-pointer hover:text-green-500"
                />
              </div>
            )} */}
          </div>
        </div>
      </nav>
    </div>
  );
}
