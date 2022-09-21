import { NextComponentType } from "next";
import { useState, useEffect } from "react";

const votingMechanisms = [
  {
    name: "Single Choice Voting",
    description: "Users can choose a single option to vote for.",
  },
  {
    name: "Quadratic Voting",
    description:
      " Users can spread their voting power accross multiple options and votes will be calculated quadratically",
  },
  {
    name: "Weighted Voting",
    description: "Users can spread their voting power accross multiple options",
  },
];

const VotingSystemDropdown: NextComponentType = () => {
  const [dropdownState, setDropdownState] = useState(true);
  // const [selectedToken, setSelectedToken] = useState({});

  const onButtonClick = () => {
    setDropdownState((prev) => !prev);
  };

  const VotingSystem = () => {
    return (
      <>
        {votingMechanisms.map((item) => {
          return (
            // <div onClick={() => {console.log(item)}} className="cursor-pointer">{item?.name}</div>
            <li
              className="mt-2 p-2 border border-gray-400 hover:bg-gray-200 mx-2 rounded-md"
              key={item["name"]}
              onClick={() => {
                // handleSelectToken(item.name, item.src);
                onButtonClick();
              }}
            >
              <p className="text-black">{item.name}</p>
              <p>
                <small>{item.description}</small>
              </p>
            </li>
          );
        })}
      </>
    );
  };

  return (
    <>
      <button
        id="dropdownDefault"
        onClick={onButtonClick}
        data-dropdown-toggle="dropdown"
        className="focus:ring-1 focus:outline-none w-full bg-gray-50 border border-gray-300 rounded-md text-gray-800 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        <div className="flex justify-between w-full items-center">
          {!(0 === 0) ? (
            <div className="hover:bg-gray-200">
              <div className="flex items-center">
                <div className="w-7 h-7">
                  <img
                    alt="..."
                    //   src={selectedToken.src}
                    className="object-cover w-full h-full"
                  />
                </div>
                <a className="block py-2 px-2">a</a>
              </div>
            </div>
          ) : (
            <p>Select Voting System</p>
          )}
          <svg
            className="ml-2 w-4 h-4"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </button>

      <div
        id="dropdown"
        className={`w-full ${
          dropdownState == true && "hidden"
        } bg-white rounded-b-lg divide-y divide-gray-100 border dark:bg-gray-700 `}
      >
        <ul
          className="py-2 pb-3 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <VotingSystem />
        </ul>
      </div>
    </>
  );
};

export default VotingSystemDropdown;
