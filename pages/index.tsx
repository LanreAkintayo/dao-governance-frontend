import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ParticleBackground from 'react-particle-backgrounds'
import Link

const Home: NextPage = () => {
  const settings2 = {
    particle: {
      particleCount: 500,
      color: "#e3d5d5",
      maxSize: 2
    },
    velocity: {
      directionAngle: 180,
      directionAngleVariance: 60,
      minSpeed: 0.1,
      maxSpeed: 0.3
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.4,
      opacityTransitionTime: 10000
    }
  }
  
  return (
    <div className="bg-stone-900 w-full h-screen relative">
      <ParticleBackground settings={settings2}/>
      <nav className="flex items-center flex-col ss:flex-row w-full justify-between px-2 py-2 sm:px-4 sm:py-4 h-full text-white bg-zinc-800 ">
        <p className="font-logo text-xl sm:text-3xl self-start ss:self-auto">
          <span className="text-orange-700">{"<"}L</span>arry
          <span className="text-orange-700">C</span>odes
          <span className="text-orange-700">{"/>"}</span>
        </p>
        <div className="flex items-center justify-end self-end ss:self-auto">
          <div className="flex justify-between items-center text-lg ">
            {!isBreakpoint && (
              <>
                <Link href="/">
                  <a className="text-white font-semibold hover:text-green-500 sm:text-xl text-lg">
                    Home
                  </a>
                </Link>
                <Link href="/projects">
                  <a className="sm:ml-8 ml-6 text-white font-semibold hover:text-green-500">
                    Projects
                  </a>
                </Link>

                <Link href="/launch">
                  <a className="sm:mx-4 mx-2 w-full text-white font-semibold hover:text-green-500 ">
                    Get Funded
                  </a>
                </Link>
              </>
            )}

            <div className="text-white flex flex-col w-full sc:py-10 items-start">
              {/* <Button type="button" text="Connect Wallet" /> */}
              <div className="px-0">
                {" "}
                <ConnectButton text="This is a button" />
              </div>
              {chainId != "97" && isWeb3Enabled && (
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
            {isBreakpoint && (
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
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
