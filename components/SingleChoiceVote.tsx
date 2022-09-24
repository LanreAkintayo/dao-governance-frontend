import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { usePromiseTracker } from "react-promise-tracker";
import { ClipLoader } from "react-spinners";
import { allValid } from "../utils/helper";
import { ethers } from "ethers";
import { erc20Abi, larAddress } from "../constants";

export default function SingleChoiceVote({
  indexToVotingPower,
  setIndexToVotingPower,
  options,
  isFetching,
  isLoading,
  handleSingleVote,
}) {
  const [selectedOption, setSelectedOption] = useState();
  const [canVote, setCanVote] = useState(true);
  const { enableWeb3, account } = useMoralis();
    // useEffect(() => {
    //   console.log("Index to voting power: ", indexToVotingPower);
    // }, [indexToVotingPower]);

  const { promiseInProgress } = usePromiseTracker();

  const checkValidity = async () => {
    const provider = await enableWeb3();

    if (provider) {
      const lar = new ethers.Contract(larAddress, erc20Abi, provider);

      const votingPowerBalance: string = await lar.balanceOf(account);

      if (Number(votingPowerBalance) > 1) {
        setCanVote(true);
      } else {
        setCanVote(false);
      }
    }
  };

  return (
    <div className="shadow bg-white p-3 pb-5 mt-4 w-10/12">
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
                className={`p-2 mt-2 border block ${
                  selectedOption == option && "bg-gray-200"
                } w-full rounded-full  border-gray-700 text-gray-700 text-lg`}
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
              promiseInProgress ||
              isFetching ||
              isLoading ||
              !allValid(indexToVotingPower) ||
              !canVote
            }
          >
            {isFetching || isLoading || promiseInProgress ? (
              <div className="flex flex-col w-full justify-between bg-blue-800 rounded-full px-3 py-3 items-center">
                <div className="flex">
                  <ClipLoader color="#fff" loading={true} size={30} />
                  <p className="ml-2">
                    {promiseInProgress ? "Wait a few Seconds" : "Voting"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex w-full bg-blue-800 rounded-full items-center px-3 py-3">
                <p className="w-full">Vote</p>
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
