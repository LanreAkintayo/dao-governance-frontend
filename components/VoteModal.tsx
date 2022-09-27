import { RotateLoader, ClipLoader } from "react-spinners";
import { usePromiseTracker } from "react-promise-tracker";
import { contractAddresses, abi, erc20Abi } from "../constants";
import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";

// handleVoteModal, handleVote : parameters
export default function VoteModal({  }) {
  // const handleOnChange = (event) => {
  //   const pledgeAmount = event.target.value
  const { promiseInProgress } = usePromiseTracker();
  const {
    Moralis,
    isWeb3Enabled,
    chainId: chainIdHex,
    enableWeb3,
    account,
  } = useMoralis();

  return (
    <div>You might be useful later</div>
    // <div className="fixed inset-0 bg-gray-900 z-50 bg-opacity-75 transition-opacity">
    //   <div
    //     tabIndex={-1}
    //     className="inline-block align-bottom h-5/6  rounded-lg w-full scrollbar-hide text-left outline-none overflow-auto transform max-w-sm mt-16 sm:max-w-md"
    //   >
    //     <div className="relative  h-full md:h-auto">
    //       {/* <!-- Modal content --> */}

    //       <div className="relative mx-3 rounded-lg shadow dark:bg-gray-700">
    //         <div className="p-5 font-hand text-xl dark:bg-black bg-white">
    //           <div className="flex justify-between items-center rounded-t">
    //             <div className="sm:text-2xl text-3xl text-center text-gray-700">
    //               Vote Overview
    //             </div>
    //             <button
    //               onClick={handleVoteModal}
    //               type="button"
    //               className="text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
    //               data-modal-toggle="small-modal"
    //             >
    //               <svg
    //                 className="w-5 h-5"
    //                 fill="currentColor"
    //                 viewBox="0 0 20 20"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   fillRule="evenodd"
    //                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //                   clipRule="evenodd"
    //                 ></path>
    //               </svg>
    //             </button>
    //           </div>

    //           <div className="my-5 w-full bg-gray-100 rounded-md p-2 flex justify-between    items-center">
    //             <p className="text-gray-600 text-sm py-2">Your Voting Power</p>
    //             <p className="text-sm">3,400 LAR</p>

    //           </div>

    //           <button
    //             className={`p-2 w-full text-white bg-blue-800 rounded-full text-center font-medium text-xl disabled:cursor-not-allowed disabled:opacity-50`}
    //             onClick={handleVote}
    //           >
    //             Vote
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
