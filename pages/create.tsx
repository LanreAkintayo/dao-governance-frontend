import { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VotingSystemDropdown from "../components/VotingSystemDropdown";
import DatePicker from "react-datepicker";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

const options = [
  { value: "Single Choice Voting", label: "Single Choice Voting" },
  { value: "Quadratic Voting", label: "Quadratic Voting" },
  { value: "Weighted Voting", label: "Weighted Voting" },
];

const formatTime = (value: number): string => {
  return moment(value).format("MMMM Do YYYY, h:mm:ss a");
};

const Create: NextPage = () => {
  // const a = moment()
  const formattedTime = formatTime(new Date().getTime());
  console.log(formattedTime);

  // console.log("Current Time: ", formatTime(new Date().getTime()))

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [proposalData, setProposalData] = useState({
    title: "",
    description: "",
    proposalType: "",
    proposalStatus: "0",
    startDate: "",
    duration: 0,
    options: [],
  });

  const [isValidDuration, setIsValidDuration] = useState(false);

  useEffect(() => {
    console.log(proposalData);
  }, [proposalData]);

  const handleSelectedVotingSystem = (name:string) => {
    setProposalData((prevProposal) => {
      return {
        ...prevProposal,
        proposalType: name
      };
    });
  }
  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value)
    const id = event.currentTarget.id;

    if (id == "duration") {
      const duration = event.target.value;
      setIsValidDuration(() => {
        if (
          /[^0-9]/g.test(duration)
        ) {
          return false;
        }
        return true;
      });
    }

    setProposalData((prevProposal) => {
      return {
        ...prevProposal,
        [id]: id == "duration" ? Number(event.target.value) : event.target.value,
      };
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
            <div className="mt-3 w-10/12 border border-gray-200 px-4 py-3">
              <p className="text-gray-700">
                <small>Choices</small>
              </p>
              <div className="flex border bg-white items-center mb-2 border-gray-200">
                <div className="flex items-center px-2">
                  <p className="ml-1 text-gray-700">1.</p>
                  <textarea
                    cols={100}
                    wrap="soft"
                    className="text-gray-700 p-2 w-full h-10 outline-none"
                  ></textarea>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="small-modal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex border bg-white items-center mb-2 border-gray-200">
                <div className="flex items-center px-2">
                  <p className="ml-1 text-gray-700">2.</p>
                  <textarea
                    cols={100}
                    wrap="soft"
                    className="text-gray-700 p-2 w-full h-10 outline-none"
                  ></textarea>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="small-modal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full my-2 mt-4 flex justify-center">
                <button className="bg-gray-200 rounded-md p-2 px-4 self-center">
                  Add More options
                </button>
              </div>
            </div>
          </div>
          <div className="w-4/12 rounded-md  text-sm">
            <div className="shadow mt-2 bg-white p-3 w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Actions
              </h1>
              <VotingSystemDropdown handleSelectedVotingSystem={handleSelectedVotingSystem} proposalData={proposalData}/>
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
                <button className="bg-gray-200 rounded-md p-2 px-5 self-center">
                  Publish
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
