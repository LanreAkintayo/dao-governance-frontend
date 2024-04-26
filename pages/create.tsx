import Footer from "../components/Footer";
import Header from "../components/Header";
import VotingSystemDropdown from "../components/VotingSystemDropdown";
import DatePicker from "react-datepicker";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import OptionsSection from "../components/OptionsSection";
import {
  daoAbi,
  erc20Abi,
  larAddress,
  daoAddress,
} from "../constants";
import { now, sDuration, toSeconds, toWei } from "../utils/helper";
import { ClipLoader } from "react-spinners";
import VotingPower from "../components/VotingPower";
import { displayToast } from "../components/Toast";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import { NextPageWithLayout } from "../types";
import Layout from "../components/Layout";

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

const Create: NextPageWithLayout = () => {
  

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishText, setPublishText] = useState("Publish");

  const [proposalData, setProposalData] = useState({
    title: "",
    description: "",
    proposalType: "",
    proposalStatus: "0",
    startDate: new Date(now()),
    duration: 0,
  });

  const [isValidDuration, setIsValidDuration] = useState(false);
  const [noOfOptions, setNoOfOptions] = useState(2);
  const [optionsIndexes, setOptionsIndexes] = useState<number[]>([]);
  const [optionTexts, setOptionTexts] = useState<{ [key: string]: string }>({});
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

  const handleSelectedVotingSystem = (name: string) => {
    setProposalData((prevProposal) => {
      return {
        ...prevProposal,
        proposalType: name,
      };
    });
  };
  const handleOnChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log(event.currentTarget.value)
    const id = event.target.id;

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
    setIsPublishing(true);
    setPublishText("Publishing Proposal");

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
    const startDate = toSeconds(proposalData.startDate.getTime());
    const duration = sDuration.minutes(proposalData.duration);
    const fee = toWei(5);


    console.log("Duration : ", duration);


    try {
      setPublishText("Approving LAR Token");

      const approveRequest = await prepareWriteContract({
        address: larAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [daoAddress, fee],
      });

      const { hash } = await writeContract(approveRequest);

      const approveReceipt = await waitForTransaction({
        hash,
      });

      if (approveReceipt.status == "success") {
        displayToast("success", "LAR Token has successfully been approved");
        setPublishText("Approved");
      } else {
        setPublishText("Publish");
        setIsPublishing(false);

        displayToast("failure", "Failed to approve LAR Token");
        return;
      }
    } catch (error) {
      setPublishText("Publish");
      setIsPublishing(false);

      displayToast("Failure", "Failed to approve LAR Token");
      return;
    }

    try {
      setPublishText("Publishing Proposal");

      const publishRequest = await prepareWriteContract({
        address: daoAddress,
        abi: daoAbi,
        functionName: "createProposal",
        args: [
          title,
          description,
          proposalType,
          proposalStatus,
          startDate,
          duration,
          options,
        ],
      });

      const { hash: publishHash } = await writeContract(publishRequest);

      const publishReceipt = await waitForTransaction({ hash: publishHash });

      if (publishReceipt.status == "success") {
        displayToast("success", "You've successfully publishd");
        setPublishText("Proposal has been published successfully.");
      } else {
        displayToast("failure", "Failed to Publish");
        setPublishText("Publishing Failed");
      }
    } catch (err) {
      console.log("Error: ", err);
      displayToast("Failure", "Failed to publish");
      setPublishText("Publishing Failed");
    }

    setIsPublishing(false);
    setPublishText("Publish Proposal");
  };

 

  return (
    <>
      <div className="flex flex-col justify-between bg-gray-50 my-8">
        <div className="my-6 space-y-6">
          <div className="mt-4 sm:mt-8 mx-4 ssm:mx-8 space-y-4 sm:space-y-0 flex flex-col sm:flex-row justify-between">
            <p className="p-2  rounded-md bg-red-100 text-red-600  text-xs">
              Note that 5 LAR is required to create a proposal
            </p>
            <VotingPower className="border border-gray-400 h-8" />
          </div>
          <div className="flex lg:flex-row flex-col mx-4 ssm:mx-8">
            <div className="lg:w-7/12 space-y-7">
              <div className="lg:w-10/12">
                <p className="text-gray-700 ss:text-sm text-xs mt-2">
                  <small>Title: Ask a question</small>
                </p>
                <textarea
                  onChange={handleOnChange}
                  id="title"
                  cols={100}
                  wrap="soft"
                  className="text-gray-700 p-2 w-full h-10 rounded-md ssm:text-base text-xs outline-none border border-gray-300"
                ></textarea>
              </div>
              <div className="mt-3 lg:w-10/12">
                <p className="text-gray-700 ss:text-sm text-xs">
                  <small>Description: Tell more about your proposal</small>
                </p>
                <textarea
                  onChange={handleOnChange}
                  id="description"
                  cols={100}
                  wrap="soft"
                  className="text-gray-700 w-full h-40 ssm:text-sm text-xs border outline-none p-2  rounded-md border-gray-300"
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
            <div className="lg:w-5/12 w-full flex lg:ml-4 items-center justify-center  lg:items-start rounded-md  text-sm">
              <div className="shadow mt-8 w-full bg-white p-3">
                <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                  Actions
                </h1>
                <VotingSystemDropdown
                  handleSelectedVotingSystem={handleSelectedVotingSystem}
                  proposalData={proposalData}
                />
                <div className="mt-4">
                  <p className="ss:text-sm text-xs">
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
                      className=" text-gray-900 md:w-60 w-40 bg-gray-50 p-2 sm:text-sm text-xs outline-none "
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
                            startDate: date,
                          };
                        });
                        // setStartDate(date);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <p className="md:text-auto ss:text-sm text-xs">
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
                    disabled={!allValid || isPublishing}
                  >
                    {isPublishing ? (
                      <div className="flex flex-col w-full justify-between bg-gray-200 rounded-md px-3 py-3 items-center">
                        <div className="flex items-center">
                          <ClipLoader color="#000" loading={true} size={30} />
                          <p className="ml-2">{publishText}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full bg-gray-200 rounded-md items-center px-3 py-3">
                        <p className="w-full">{publishText}</p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Create.getLayout = function getLayout(page: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined) {
  return <Layout>{page}</Layout>;
};

export default Create;

