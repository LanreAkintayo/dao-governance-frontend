import { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VotingSystemDropdown from "../components/VotingSystemDropdown";
import DatePicker from "react-datepicker";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import OptionsSection from "../components/OptionsSection";
import { useChain, useMoralis, useWeb3Contract } from "react-moralis";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useNotification } from "web3uikit";
import { useSWRConfig } from "swr";
import { abi, contractAddresses, erc20Abi, larAddress } from "../constants";
import { ethers } from "ethers";
import { sDuration, toSeconds, toWei } from "../utils/helper";
import { ClipLoader } from "react-spinners";

interface TypeDict {
  [key: string]: string;
}

const typeDict: TypeDict = {
  "Single Choice Voting": "0",
  "Weighted Voting": "1",
  "Quadratic Voting": "2",
};

const formatTime = (value: number): string => {
  return moment(value).format("MMMM Do YYYY, h:mm:ss a");
};

const Create: NextPage = () => {
  // const formattedTime = formatTime(new Date().getTime());
  // console.log(formattedTime);

  const { promiseInProgress } = usePromiseTracker();
  const dispatch = useNotification();
  const { mutate } = useSWRConfig();

  const {
    isWeb3Enabled,
    chainId: chainIdHex,
    enableWeb3,
    Moralis,
  } = useMoralis();
  const { switchNetwork, chain, account } = useChain();

  const chainId: number = parseInt(chainIdHex!);

  const length = contractAddresses[chainId]?.length;

  const daoAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;

  const [proposalData, setProposalData] = useState({
    title: "",
    description: "",
    proposalType: "",
    proposalStatus: "0",
    startDate: 0,
    duration: 0,
  });

  const [isValidDuration, setIsValidDuration] = useState(false);
  const [noOfOptions, setNoOfOptions] = useState(2);
  const [optionsIndexes, setOptionsIndexes] = useState([]);
  const [optionTexts, setOptionTexts] = useState({});
  const [allValid, setAllValid] = useState(false);

  useEffect(() => {
    setAllValid(
      Object.values(proposalData).every(
        (item) => ![false, 0, null, "", {}].includes(item)
      ) &&
        isValidDuration &&
        Object.values(optionTexts).every((item) => item != "") &&
        Object.keys(optionTexts).length >= optionsIndexes.length
    );
  }, [proposalData, isValidDuration, optionTexts, optionsIndexes]);

  useEffect(() => {
    console.log(proposalData);
  }, [proposalData]);

  const {
    runContractFunction: createProposal,
    isFetching,
    isLoading,
  } = useWeb3Contract();

  const handleSelectedVotingSystem = (name: string) => {
    setProposalData((prevProposal) => {
      return {
        ...prevProposal,
        proposalType: name,
      };
    });
  };
  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value)
    const id = event.currentTarget.id;

    if (id == "duration") {
      const duration = event.target.value;
      setIsValidDuration(() => {
        if (/[^0-9]/g.test(duration)) {
          return false;
        }
        return true;
      });
    }

    setProposalData((prevProposal) => {
      return {
        ...prevProposal,
        [id]:
          id == "duration" ? Number(event.target.value) : event.target.value,
      };
    });
  };

  const handleCreate = async () => {
    const options = optionsIndexes.map((index) => {
      return {
        index,
        optionText: optionTexts[index],
        vote: 0,
      };
    });

    const title = proposalData.title;
    const description = proposalData.description;
    const proposalType = typeDict[proposalData.proposalType];
    const proposalStatus = proposalData.proposalStatus;
    const startDate = toSeconds(proposalData.startDate);
    const duration = sDuration.minutes(proposalData.duration);
    const fee = toWei(5);

    console.log(duration)
    // console.log(duration)

    const provider = await enableWeb3();

    const lar = new ethers.Contract(larAddress, erc20Abi, provider);

    const signer = provider?.getSigner(account);
    // const approveTx = await trackPromise(
    //   lar.connect(signer).approve(daoAddress, fee)
    // );
    // await trackPromise(approveTx.wait(1));

    // createProposal({
    //   params: {
    //     abi: abi,
    //     contractAddress: daoAddress,
    //     functionName: "createProposal",
    //     params: {
    //       _title: title,
    //       _description: description,
    //       _proposalType: proposalType,
    //       _proposalStatus: proposalStatus,
    //       _startDate: startDate,
    //       _duration: duration,
    //       _options: options,
    //     },
    //   },
    //   onSuccess: handleSuccess,
    //   onError: (error) => {
    //     handleFailure(error);
    //   },
    // });
  };

  const handleSuccess = async (tx) => {
    console.log("Success transaction: ", tx);
    await trackPromise(tx.wait(1));
    // updateUIValues()
    dispatch({
      type: "success",
      message: "Transaction Completed!",
      title: "Transaction Notification",
      position: "topR",
    });
    // const newProposal = await getLatestProposal();

    // console.log("New Proposal: ", newProposal);
    // setProposalData({ ...newProposal });
    // mutate("web3/votingPower")
    // setIndexToVotingPower({})
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
    <div className="flex flex-col justify-between bg-gray-50 h-full">
      <div>
        <Header />
        <div className="flex mt-20 mx-4">
          <div className="w-8/12 p-2 pl-4 pr-11 ">
            <div className="w-10/12">
              <p className="text-gray-700">
                <small>Title: Ask a question</small>
              </p>
              <textarea
                onChange={handleOnChange}
                id="title"
                cols={100}
                wrap="soft"
                className="text-gray-700 p-2 w-full h-10 rounded-md  outline-none border border-gray-300"
              ></textarea>
            </div>
            <div className="mt-3 w-10/12">
              <p className="text-gray-700">
                <small>Description: Tell more about your proposal</small>
              </p>
              <textarea
                onChange={handleOnChange}
                id="description"
                cols={100}
                wrap="soft"
                className="text-gray-700 w-full h-40 border outline-none p-2  text-sm rounded-md border-gray-300"
              ></textarea>
            </div>
            <OptionsSection
              noOfOptions={noOfOptions}
              setNoOfOptions={setNoOfOptions}
              optionsIndexes={optionsIndexes}
              setOptionsIndexes={setOptionsIndexes}
              optionTexts={optionTexts}
              setOptionTexts={setOptionTexts}
            />
          </div>
          <div className="w-4/12 rounded-md  text-sm">
            <div className="shadow mt-2 bg-white p-3 w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Actions
              </h1>
              <VotingSystemDropdown
                handleSelectedVotingSystem={handleSelectedVotingSystem}
                proposalData={proposalData}
              />
              <div className="mt-4">
                <p className="text-sm">
                  <small>Set Start Date</small>
                </p>

                <div className="flex bg-gray-50 border px-2 rounded-md border-gray-300 items-center ">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>

                  {/* <DatePicker /> */}

                  <DatePicker
                    id="launchDate"
                    className=" text-gray-900 md:w-60 w-40 bg-gray-50 p-2 sm:text-sm outline-none "
                    selected={proposalData.startDate}
                    onChange={(date: Date) => {
                      const dateInMilliseconds = date.getTime();
                      const currentDateInMilliseconds = new Date().getTime();

                      //   setIsValidLaunchDate(
                      //     dateInMilliseconds > currentDateInMilliseconds
                      //       ? true
                      //       : false
                      //   );

                      setProposalData((prevProposalData) => {
                        return {
                          ...prevProposalData,
                          startDate: dateInMilliseconds,
                        };
                      });
                      // setStartDate(date);
                    }}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <p className="md:text-auto text-sm">
                    <small>Specify proposal duration in minutes</small>
                  </p>

                  <input
                    onChange={handleOnChange}
                    type="text"
                    name="text"
                    id="duration"
                    placeholder="1"
                    className="w-full block p-2 md:text-sm text-xs mt-1 border border-gray-300 focus:outline-none rounded-md"
                  />

                  {!isValidDuration && (
                    <p className="text-red-700 md:text-sm text-xs">
                      <small>Duration is not valid</small>
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full my-2 mt-4 flex justify-center">
                <button
                  className="w-full p-2 px-5 self-center disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCreate}
                  disabled={
                    !allValid || isFetching || isLoading || promiseInProgress
                  }
                >
                  {(isFetching || isLoading || promiseInProgress )? (
                    <div className="flex flex-col w-full justify-between bg-gray-200 rounded-md px-3 py-3 items-center">
                      <div className="flex items-center">
                        <ClipLoader color="#000" loading={true} size={30} />
                        <p className="ml-2">
                          {promiseInProgress
                            ? "Wait a few Seconds"
                            : "Publishing"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full bg-gray-200 rounded-md items-center px-3 py-3">
                      <p className="w-full">Publish</p>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Create;
