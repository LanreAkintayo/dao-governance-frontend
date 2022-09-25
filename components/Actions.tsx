import { useState } from "react";
import DatePicker  from "react-datepicker";
import VotingSystemDropdown from "./VotingSystemDropdown";

export default function Actions({handleOnChange, proposalData, setProposalData}){


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


    return(
        <div className="w-4/12 rounded-md  text-sm">
            <div className="shadow mt-2 bg-white p-3 w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Actions
              </h1>
              <VotingSystemDropdown />
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
                    selected={startDate}
                    onChange={(date: Date) => {
                      const dateInMilliseconds = date.getTime();
                      const currentDateInMilliseconds = new Date().getTime();

                      //   setIsValidLaunchDate(
                      //     dateInMilliseconds > currentDateInMilliseconds
                      //       ? true
                      //       : false
                      //   );

                      //   setProjectInfo((prevProjectInfo) => {
                      //     return {
                      //       ...prevProjectInfo,
                      //       launchDate: date,
                      //     };
                      //   });
                    //   setStartDate(date);
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
                    {proposalData.
                        <p className="text-red-700 md:text-sm text-xs">
                        <small>Duration should be within 1 and 1000</small>
                      </p>
                    }
                  
                </div>
              </div>
              <div className="w-full my-2 mt-4 flex justify-center">
                <button className="bg-gray-200 rounded-md p-2 px-5 self-center">
                  Publish
                </button>
              </div>
            </div>
          </div>
    )
}