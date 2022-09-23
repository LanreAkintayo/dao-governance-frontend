import { useEffect, useState } from "react";

interface VotingPower {
  [key: string]: number;
}

const getCurrentPercentage = (votingPower, index:string, indexVotingPower:number) => {

    console.log("We are here")
    console.log("Voting power: ", votingPower)
    console.log("Index: ", index)
    console.log("Index Voting power: ", indexVotingPower)
    
    let totalValue = 0;
    const votingPowerArray = Object.values(votingPower)
    console.log("Voting Power array: ", votingPowerArray)
    for (let i = 0; i < votingPowerArray.length; i++){
        const present = votingPowerArray[i]

        const currentValue = present.value
        console.log("Current value: ", currentValue) 
        totalValue += currentValue
    }
    // for (let i in votingPower){
    //     const value = votingPower
    //     const currentValue = votingPower.i
    //     console.log("ggggggggggggValue: ", currentValue)

    //     if (i != index){
    //         totalValue += value
    //     } 
    // }


    return (indexVotingPower / (totalValue + indexVotingPower)) * 100
}

export default function QuadraticVote({
  votingIndex,
  setVotingIndex,
  //   setVotingPower,
  options,
}) {
  const handleClick = {};

  const [votingPower, setVotingPower] = useState({});

  useEffect(() => {
    console.log(votingPower);
  }, [votingPower]);

  const handleSubClick = (index:string) => {
    setVotingPower((prevVotingPower) => {
        const currentValue = prevVotingPower[index]?.value
        const currentPercentage = prevVotingPower[index]?.percent
      if (isNaN(currentValue) && isNaN(currentPercentage) || currentValue <= 0 )  {
        return {
          ...prevVotingPower,
          [index]: {value: 0, percent: 0},
        };
      } else {
        return {
          ...prevVotingPower,
          [index]: {
            value: prevVotingPower[index].value--,
            percent:getCurrentPercentage(prevVotingPower, index,  prevVotingPower[index].value )
          }
        };
      }
    });
  };
  const handleAddClick = (index) => {
    setVotingPower((prevVotingPower) => {
    //   console.log("index: ", index);
      const currentValue = prevVotingPower[index]?.value
      const currentPercentage = prevVotingPower[index]?.percent
      console.log("Current percentage: ", currentPercentage)
      if (isNaN(currentValue) && isNaN(currentPercentage) || currentValue < 0 ) {
        return {
          ...prevVotingPower,
          [index]: {value:0, percent:0},
        };
      } else {
        const newValue = prevVotingPower[index].value
        return {
          ...prevVotingPower,
          [index]: {
            value: prevVotingPower[index].value++,
            percent:getCurrentPercentage(prevVotingPower, index,prevVotingPower[index].value )
          }
        };
      }
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
            return (
              <div className="flex mt-4 justify-between rounded-full border shadow border-gray-700 text-gray-700 items-center">
                <div>
                  <p className="text-lg px-4">{option.optionText}</p>
                </div>
                <div className="flex text-xl items-center">
                  <button
                    className="text-2xl border-l py-2 px-3 border-r border-gray-400"
                    onClick={() => handleSubClick(option.optionIndex)}
                  >
                    -
                  </button>

                  <input
                    onChange={(event) => {
                      setVotingPower((prev) => {
                        return {
                          ...prev,
                          [option.optionIndex]: event.target.value,
                        };
                      });
                    }}
                    type="text"
                    name="text"
                    value={votingPower[option.optionIndex]?.value || 0}
                    className="px-2 text-gray-800 text-lg w-14 outline-none text-center"
                  />

                  <button
                    className="text-2xl border-l px-3 border-r py-2 border-gray-400"
                    onClick={() => handleAddClick(option.optionIndex)}
                  >
                    +
                  </button>
                  <p className="px-3 text-gray-800 text-lg">{votingPower[option.optionIndex]?.percent || 0}%</p>
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
