import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { useMoralis } from "react-moralis";
import { usePromiseTracker } from "react-promise-tracker";
import { ClipLoader } from "react-spinners";
import { allValid } from "../utils/helper";
import { ethers, BigNumber } from "ethers";
import { erc20Abi, larAddress } from "../constants";
import {
  getAccount,
  readContract,
} from "@wagmi/core";
import { IOption } from "../types";

export default function SingleChoiceVote({
  indexToVotingPower,
  setIndexToVotingPower,
  options,
  isFetching,
  isLoading,
  handleSingleVote,
  voteText,
  isVoting
}: {
  indexToVotingPower: {
    [key: string]: number;
  };
  setIndexToVotingPower: Dispatch<
    SetStateAction<{
      [key: string]: number;
    }>
  >;
  options: IOption[];
  isFetching: boolean;
  isLoading: boolean;
  handleSingleVote: () => Promise<void>;
  voteText: string;
  isVoting: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState<IOption>();
  const [canVote, setCanVote] = useState(true);
  const account  = getAccount();

  console.log("Account singlechoiceVote: ", account)
  // useEffect(() => {
  //   console.log("Index to voting power: ", indexToVotingPower);
  // }, [indexToVotingPower]);

  const { promiseInProgress } = usePromiseTracker();

  const checkValidity = async () => {
    const votingPowerBalance = await readContract({
      address: larAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account?.address]
    }) as string

    console.log("We have ", votingPowerBalance);

    if (Number(votingPowerBalance) > 1) {
      setCanVote(true);
    } else {
      setCanVote(false);
    }
  };

  return (
    <div className="shadow bg-white p-3 pb-5 mt-4 w-10/12 items-center justify-center">
      <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
        Cast your Vote
      </h1>
      <div>
        <div className="w-full h-full text-center items-center">
          {options?.map((option) => {
            if (selectedOption == option) {
            }
            return (
              <button
              key={option.optionIndex}
                className={`p-2 mt-2 border block ${
                  selectedOption == option && "bg-gray-200"
                } w-full rounded-full  border-gray-700 text-gray-700 text-xs sm:text-sm`}
                onClick={() => {
                  setSelectedOption(option);
                  setIndexToVotingPower({ [option.optionIndex]: 1 });
                  checkValidity();
                }}
              >
                {option.optionText}
              </button>
            );
          })}
          <button
            className="mt-2 rounded-md p-2 w-full text-white text-xl disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleSingleVote}
            disabled={
              isVoting ||
              !allValid(indexToVotingPower) ||
              !canVote
            }
          >
            {isVoting ? (
              <div className="flex flex-col w-full justify-between bg-blue-800 rounded-full px-3 py-3 items-center">
                <div className="flex">
                  <ClipLoader color="#fff" loading={true} size={30} />
                  <p className="ml-2">
                    {voteText}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex w-full bg-blue-800 rounded-full items-center px-3 py-3">
                <p className="w-full">{voteText}</p>
              </div>
            )}
          </button>
          {!canVote && (
            <p className="text-red-800 text-xs text-start mt-2">
              You need only 1 LAR to cast your vote
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
