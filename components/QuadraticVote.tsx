import { useEffect, useState } from "react";
import { toDp } from "../utils/helper";

interface VotingPower {
  [key: string]: number;
}

const getCurrentPercentage = (votingPower: VotingPower) => {
  const onlyValues = Object.values(votingPower);

  const percentage = {};

  const totalSum = onlyValues.reduce((a, b) => {
    return a + b;
  }, 0);

  Object.keys(votingPower).map((optionVote) => {
    const vote = votingPower[optionVote];
    const percent = (vote / totalSum) * 100;
    percentage[optionVote] = percent;
    // return {[optionVote]: percent}
  });

  return percentage;
};

export default function QuadraticVote({
  votingPower,
  setVotingPower,
  options,
}) {
  const handleClick = {};

  const [percentages, setPercentages] = useState({});

  useEffect(() => {
    const percentageArray = getCurrentPercentage(votingPower);
        setPercentages(percentageArray);
  }, [votingPower])

  const handleSubClick = (index: string) => {
    setVotingPower((prevVotingPower) => {
      const currentValue = prevVotingPower[index];

      if (isNaN(currentValue) || currentValue <= 0) {
        const percentageArray = getCurrentPercentage(prevVotingPower);
        setPercentages(percentageArray);
        return {
          ...prevVotingPower,
          [index]: 0,
        };
      } else {
        const percentageArray = getCurrentPercentage(prevVotingPower);
        setPercentages(percentageArray);
        return {
          ...prevVotingPower,
          [index]: prevVotingPower[index]--,
        };
      }
    });
  };
  const handleAddClick = (index) => {
    console.log("Okayy")
    setVotingPower((prevVotingPower) => {
      const currentValue = prevVotingPower[index];

      if (isNaN(currentValue) || currentValue < 0) {
        // const percentageArray = getCurrentPercentage(prevVotingPower);
        // setPercentages(percentageArray);
        return {
          ...prevVotingPower,
          [index]: 1,
        };
      } else {
        // const percentageArray = getCurrentPercentage(prevVotingPower);
        // setPercentages(percentageArray);
        return {
          ...prevVotingPower,
          [index]: prevVotingPower[index]++,
        };
      }
    });
  };

  const handleOnChange = (event, index) => {
    setVotingPower((prevVotingPower) => {
      const currentValue = Number(event.target.value);

      const percentageArray = getCurrentPercentage(prevVotingPower);
      setPercentages(percentageArray);
      return {
        ...prevVotingPower,
        [index]: currentValue,
      };
    });
  };

  return (
    <div className="shadow bg-white p-3 pb-5 mt-4 w-10/12">
      <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
        Cast your Vote
      </h1>
      <div>
        <div className="w-full h-full text-center items-center">
          {options.map((option) => {
            const percentage = percentages[option.optionIndex];

            // index++;

            return (
              <div className="flex mt-4 w-full justify-between rounded-full border  border-gray-700 text-gray-700 items-center">
                <div className="w-8/12">
                  <p className="text-base text-start px-8">
                    {option.optionText}
                  </p>
                </div>
                <div className="flex w-4/12 text-xl items-center">
                  <button
                    className="text-lg w-10 border-l py-2 px-3 border-r border-gray-300"
                    onClick={() => handleSubClick(option.optionIndex)}
                  >
                    <p className="w-full">-</p>
                  </button>

                  <input
                    onChange={(event) => handleOnChange(event, option.optionIndex)}
                    type="text"
                    name="text"
                    placeholder="0"
                    value={votingPower[option.optionIndex]}
                    className="px-2 text-gray-800 text-base w-14 outline-none text-center"
                  />

                  <button
                    className="text-lg z-50 border-l px-3 border-r py-2 border-gray-300"
                    onClick={() => handleAddClick(option.optionIndex)}
                  >
                    +
                  </button>
                  <p className="text-gray-800 px-2 text-base">
                    {(percentage == 0 || isNaN(percentage)
                      ? "0"
                      : toDp(percentage || 0, 1)) || 0}
                    %
                  </p>
                </div>
              </div>
            );
          })}

          <p className="mt-2 rounded-md p-2 bg-blue-800 text-white text-xl">
            Vote
          </p>
        </div>
      </div>
    </div>
  );
}
