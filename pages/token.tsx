import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract, useWeb3Transfer } from "react-moralis";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ClipLoader } from "react-spinners";
import { useSWRConfig } from "swr";
import { useNotification } from "web3uikit";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VotingPower from "../components/VotingPower";
import { abi, contractAddresses, DEPLOYER, erc20Abi, larAddress } from "../constants";
import { ethers } from "ethers";
import { toWei } from "../utils/helper";

const Proposals: NextPage = () => {
  const [userAddress, setUserAddress] = useState("");
  const { Moralis, enableWeb3, account, chainId: chainIdHex, } = useMoralis();
  const { promiseInProgress } = usePromiseTracker();
  const dispatch = useNotification();
  const { mutate } = useSWRConfig();

  const chainId: number = parseInt(chainIdHex!);

  const length = contractAddresses[chainId]?.length;

  const daoAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;



  const {
    runContractFunction: sendLAR,
    isFetching,
    isLoading,
  } = useWeb3Contract();

  useEffect(() => {
    console.log(userAddress);
  }, [userAddress]);

  const handleClick = async () => {
    sendLAR({
      params: {
        abi: abi,
        contractAddress: daoAddress,
        functionName: "sendLAR",
        params: {
          receiver:userAddress,
        },
      },
      onSuccess: handleSuccess,
      onError: (error) => {
        handleFailure(error);
      },
    });
  };
  const handleSuccess = async (tx) => {
    console.log("Success transaction: ", tx);
    await trackPromise(tx.wait(1));

    dispatch({
      type: "success",
      message: "Transaction Completed!",
      title: "Transaction Notification",
      position: "topR",
    });

    mutate("web3/votingPower");
  };

  const handleFailure = async (error) => {
    console.log("Error: ", error);
    dispatch({
      type: "error",
      message: "Transation Failed",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  return (
    <div className="flex flex-col justify-between bg-gray-50 h-screen">
      <Header />

      <section className="px-5 mt-24 flex flex-col items-center ">
        <VotingPower className="self-end border border-gray-300" />

        <div className="w-full flex items-center justify-center flex-col" >
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
              userAddress == "" || isFetching || isLoading || promiseInProgress
            }
          >
            {isFetching || isLoading || promiseInProgress ? (
              <div className="flex flex-col w-full bg-orange-200 justify-between rounded-md px-3 py-3 items-center">
                <div className="flex items-center">
                  <ClipLoader color="#000" loading={true} size={30} />
                  <p className="ml-2">
                    {promiseInProgress ? "Wait a few Seconds" : "Sending"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex w-full bg-orange-200 text-orange-700 rounded-md items-center px-3 py-3">
                <p className="w-full">Get 50 LAR</p>
              </div>
            )}
          </button>
        </div>
        <div className="ssm:mt-12 mt-4 w-12/12 ssm:w-5/12">
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
