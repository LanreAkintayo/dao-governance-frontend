import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fromWei, toDp, toWei } from "../utils/helper";
import { usePromiseTracker } from "react-promise-tracker";
import { ClipLoader } from "react-spinners";
// import { useMoralis } from "react-moralis";
import { erc20Abi, larAddress } from "../constants";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import {
  getAccount,
  getNetwork,
  switchNetwork,
  readContract,
  getContract,
  fetchBalance,
} from "@wagmi/core";
import { IOption } from "../types";
interface VotingPower {
  [key: string]: number;
}

interface Option {
  optionIndex: string[];
  optionText: string[];
  optionVote: string;
  optionPercentage: string;
}

const getCurrentPercentage = (votingPower: VotingPower) => {
  const onlyValues = Object.values(votingPower);

  const percentage: { [key: string]: number } = {};

  const totalSum = onlyValues.reduce((a, b) => {
    return a + b;
  }, 0);

  Object.keys(votingPower).map((optionVote) => {
    const vote = votingPower[optionVote];
    const percent = (vote / totalSum) * 100;
    percentage[optionVote] = percent;
  });

  return percentage;
};

const sum = (votingPower: VotingPower) => {
  const totalSum = Object.values(votingPower).reduce((a, b) => {
    return a + b;
  }, 0);
  return totalSum;
};

export default function QuadraticVote({
  votingPower,
  setVotingPower,
  options,
  handleVote,
  isFetching,
  isLoading,
  voteText,
  isVoting,
}: {
  votingPower: { [key: string]: number };
  options: IOption[];
  handleVote: () => Promise<void>;
  isFetching: boolean;
  isLoading: boolean;
  setVotingPower: Dispatch<
    SetStateAction<{
      [key: string]: number;
    }>
  >;
  voteText: string;
  isVoting: boolean;
}) {
  // const { account, enableWeb3, Moralis, isWeb3Enabled } = useMoralis();
  const account = getAccount();

  const { promiseInProgress } = usePromiseTracker();

  const [percentages, setPercentages] = useState<{ [key: string]: number }>({});
  const [isValidVotingPower, setIsValidVotingPower] = useState(true);

  const checkValidity = async (votingPower: VotingPower) => {
    const votingPowerBalance = (await readContract({
      address: larAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account?.address],
    })) as string;

    if (votingPower) {
      const summation = toWei(
        Object.values(votingPower).reduce((a, b) => {
          return a + b;
        }, 0)
      );
      // const votingPowerBalance: string = await lar.balanceOf(account);

      if (Number(summation) > Number(votingPowerBalance)) {
        setIsValidVotingPower(false);
      } else {
        setIsValidVotingPower(true);
      }
    }
  };
  useEffect(() => {
    const percentageArray = getCurrentPercentage(votingPower);
    setPercentages(percentageArray);
    checkValidity(votingPower);
  }, [votingPower]);

  useEffect(() => {
    console.log("Valid? ", isValidVotingPower);
  }, [isValidVotingPower]);

  const handleSubClick = (index: string) => {
    setVotingPower((prevVotingPower: VotingPower) => {
      const currentValue = prevVotingPower[index];

      if (isNaN(currentValue) || currentValue <= 0) {
        return {
          ...prevVotingPower,
          [index]: 0,
        };
      } else {
        const newVotingPower = prevVotingPower[index] - 1;
        return {
          ...prevVotingPower,
          [index]: newVotingPower,
        };
      }
    });
  };
  const handleAddClick = (index: string) => {
    setVotingPower((prevVotingPower: VotingPower) => {
      const currentValue = prevVotingPower[index];

      if (isNaN(currentValue) || currentValue < 0) {
        return {
          ...prevVotingPower,
          [index]: 1,
        };
      } else {
        const newVotingPower = prevVotingPower[index] + 1;
        return {
          ...prevVotingPower,
          [index]: newVotingPower,
        };
      }
    });
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: string
  ) => {
    setVotingPower((prevVotingPower: VotingPower) => {
      // let currentValue

      // if(isNaN(Number(event.currentTarget.value))){
      //   currentValue = ""
      // }

      const currentValue =
        Number(event.currentTarget.value) < 0
          ? 0
          : Number(event.currentTarget.value);

      const percentageArray = getCurrentPercentage(prevVotingPower);
      setPercentages(percentageArray);
      return {
        ...prevVotingPower,
        [index]: currentValue,
      };
    });
  };

  return (
    <div className="shadow bg-white p-3 pb-5 mt-4 w-full ss:w-10/12">
      <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
        Cast your Vote
      </h1>
      <div>
        <div className="w-full h-full text-center items-center">
          {options.map((option) => {
            // console.log("Option: ", option)
            const percentage = percentages[option.optionIndex];

            // index++;

            return (
              <div
                key={option.optionIndex}
                className="flex mt-4 w-full justify-between rounded-full border hover:border-gray-900 border-gray-500 text-gray-700 items-center"
              >
                <div className="lg:w-7/12 md:w-7/12 ssm:w-5/12 w-4/12">
                  <p className="ss:text-sm text-xs break-words truncate whitespace-nowrap sm:text-base px-3 lg:px-8 text-start ">
                    {option.optionText}
                  </p>
                </div>
                <div className="flex lg:w-5/12 md:w-5/12 ssm:w-7/12 w-8/12 text-xl items-center">
                  <button
                    className=" ml-4 text-lg w-10 outline-none border-l py-2 px-3 border-r border-gray-300"
                    onClick={() =>
                      handleSubClick(option.optionIndex.toString())
                    }
                  >
                    <p className="w-full">-</p>
                  </button>

                  <input
                    onChange={(event) =>
                      handleOnChange(event, option.optionIndex.toString())
                    }
                    type="number"
                    name="text"
                    placeholder="0"
                    value={votingPower[option.optionIndex]}
                    className="px-2 text-gray-800 text-[12px] sm:text-base w-10 sm:w-14 outline-none text-center"
                  />

                  <button
                    className="text-lg border-l outline-none px-3 border-r py-2 border-gray-300"
                    onClick={() =>
                      handleAddClick(option.optionIndex.toString())
                    }
                  >
                    +
                  </button>
                  <p className="text-gray-800 pl-2 text-[12px] sm:text-base ">
                    {(percentage == 0 || isNaN(percentage)
                      ? "0"
                      : toDp(percentage || 0, 1)) || 0}
                    %
                  </p>
                </div>
              </div>
            );
          })}

          <button
            onClick={handleVote}
            disabled={
              sum(votingPower) <= 0 ||
              isVoting ||
              !isValidVotingPower ||
              promiseInProgress
            }
            className="mt-2 p-2  w-full disabled:opacity-50 disabled:cursor-not-allowed text-white text-xl"
          >
            {isVoting ? (
              <div className="flex flex-col w-full justify-between bg-blue-800 rounded-full px-3 py-3 items-center">
                <div className="flex">
                  <ClipLoader color="#fff" loading={true} size={30} />
                  <p className="ml-2">{voteText}</p>
                </div>
              </div>
            ) : (
              <div className="flex w-full bg-blue-800 rounded-full items-center px-3 py-3">
                <p className="w-full">{voteText}</p>
              </div>
            )}
          </button>

          {!isValidVotingPower && (
            <p className="text-red-800 text-xs text-start mt-2">
              Insufficient Voting Power
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
