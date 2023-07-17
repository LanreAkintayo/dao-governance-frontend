import { NextPage } from "next";
import { useEffect, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ClipLoader } from "react-spinners";
import { useSWRConfig } from "swr";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VotingPower from "../components/VotingPower";
import {
  daoAbi,
  contractAddresses,
  DEPLOYER,
  erc20Abi,
  larAddress,
  daoAddress,
} from "../constants";
import { ethers, Signer, ContractTransaction } from "ethers";
import { toWei } from "../utils/helper";
import { ToastContainer, toast, cssTransition } from "react-toastify";
// import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { displayToast } from "../components/Toast";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  getAccount
} from "@wagmi/core";
import useProposals from "../hooks/useProposals";

const Proposals: NextPage = () => {
  const [userAddress, setUserAddress] = useState("");
  const { promiseInProgress } = usePromiseTracker();

  const {loadLarBalance} = useProposals()
  const account = getAccount()

  const [isSending, setIsSending] = useState(false);
  const [sendText, setSendText] = useState("Get 50 LAR");

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });

  const swirl = cssTransition({
    enter: "swirl-in-fwd",
    exit: "swirl-out-bck",
  });

  // function animateCss() {
  //   toast.dark("Hey 👋, see how easy!", {
  //     transition: bounce
  //   });
  // }

  // function animista() {
  //   toast.dark("Hey 👋, see how easy!", {
  //     transition: swirl
  //   });
  // }



  

  useEffect(() => {
    console.log(userAddress);
  }, [userAddress]);

  const handleClick = async () => {
    setIsSending(true);

    try {
      setSendText("Sending 50 LAR");

      const sendRequest = await prepareWriteContract({
        address: daoAddress as `0x${string}`,
        abi: daoAbi,
        functionName: "sendLAR",
        args: [userAddress],
      });

      const { hash: sendHash } = await writeContract(sendRequest);

      const sendReceipt = await waitForTransaction({ hash: sendHash });

      if (sendReceipt.status == "success") {
        displayToast("success", "You've been sent 50 LAR");

        await loadLarBalance(account?.address)
      } else {
        displayToast("failure", "Failed to send 50 LAR");
        setSendText("Sending Failed");

      }
    } catch (err) {
      console.log("Error: ", err);
      displayToast("Failure", "Failed to send");
      setSendText("Sending Failed");
    }

    setIsSending(false);
    setSendText("Get 50 LAR");
  };
  const handleSuccess = async (results: unknown) => {
    const tx = results as ContractTransaction;
    console.log("Success transaction: ", tx);
    await trackPromise(tx.wait(1));
    displayToast("success");
    // dispatch({
    //   type: "success",
    //   message: "Transaction Completed!",
    //   title: "Transaction Notification",
    //   position: "bottomR",
    // });

  };

  const handleFailure = async (error: Error) => {
    console.log("Error: ", error);
    displayToast("failure");
    // dispatch({
    //   type: "error",
    //   message: "Transation Failed",
    //   title: "Transaction Notification",
    //   position: "bottomR",
    // });
  };

  return (
    <div className="flex flex-col justify-between bg-gray-50 h-screen">
      <div>
        <ToastContainer />
      </div>
      <Header />
      <section className="px-5 mt-24 flex flex-col items-center ">
        <VotingPower className="self-end border border-gray-300" />

        <div className="w-full flex items-center justify-center flex-col">
          <p className="mt-4 ">Enter Address</p>
          <input
            onChange={(event) => {
              setUserAddress(event.target.value);
            }}
            type="text"
            name="text"
            id="duration"
            placeholder="0xdd9..."
            className="ssm:w-96 w-72 block p-2 md:text-sm text-gray-700 text-xs mt-1 border border-gray-300 focus:outline-none rounded-md"
          />
          <button
            onClick={handleClick}
            className="p-2 rounded-md ssm:text-lg text-sm self-center text-orange-800 my-4 ssm:w-80 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={
              userAddress == "" || isSending
            }
          >
            {isSending ? (
              <div className="flex flex-col w-full bg-orange-200 justify-between rounded-md px-3 py-3 items-center">
                <div className="flex items-center">
                  <ClipLoader color="#000" loading={true} size={30} />
                  <p className="ml-2">
                    {sendText}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex w-full bg-orange-200 text-orange-700 rounded-md items-center px-3 py-3">
                <p className="w-full">{sendText}</p>
              </div>
            )}
          </button>
        </div>
        <div className="ssm:mt-12 mt-4 w-12/12 ssm:w-7/12 sm:w-5/12">
          <p className="text-gray-700 text-center text-xs ss:text-sm">
            Note: LAR Token is a governance token that is needed when creating a
            proposal or when voting on one.
            <br />
            <br />5 LAR is required to create a proposal
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Proposals;
