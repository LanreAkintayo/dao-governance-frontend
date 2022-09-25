import { useEffect, useState } from "react";
import { range } from "../utils/helper";

export default function OptionsSection({
  noOfOptions,
  setNoOfOptions,
  optionsIndexes,
  setOptionsIndexes,
  optionTexts,
  setOptionTexts,
}) {
  
  useEffect(() => {
    // console.log("Options Indexes: .................", optionsIndexes);
    setOptionTexts((prev) => {
      return {
        ...prev,
      };
    });
  }, [optionsIndexes]);

  const handleOnChange = (event, index) => {
    // console.log("I am suppose to be here");
    // console.log("Value right now: ", event.target.value);
    // console.log(index);
    setOptionTexts((prev) => {
      return {
        ...prev,
        [index]: event.target.value,
      };
    });
  };

  useEffect(() => {
    const indexes = range(0, noOfOptions);
    setOptionsIndexes(indexes);
  }, [noOfOptions]);

  const handleMoreOptions = () => {
    setNoOfOptions((prev) => {
      const newNo = prev + 1;
      return newNo;
    });

    const indexes = range(0, noOfOptions);
    setOptionsIndexes(indexes);
  };
  const handleRemoveOption = () => {
    const index = optionsIndexes.length - 1;
    setOptionsIndexes((prevIndexes) => {
      const indexes = prevIndexes;
    //   console.log("Indexes initially: ", indexes);
    //   console.log("Index to slice:", index);
      indexes.splice(index, 1);

    //   console.log("Indexes after splicing: ", indexes);

      return indexes;
    });

    setNoOfOptions((prev) => {
      const newOne = prev - 1;
      return newOne;
    });
  };

  return (
    <div className="mt-3 w-10/12 border border-gray-400 px-4 py-3">
      <div className="flex items-center justify-between">
        <p className="text-gray-700">
          <small>Choices</small>
        </p>
        <div className="flex items-center">
          <div
            className="w-8 h-8 mr-2 bg-gray-200 rounded-md p-2 text-black hover:text-orange-500 cursor-pointer"
            // onClick={handleSidebar}
          >
            <img
              alt="..."
              src="/minus.png"
              className="object-cover w-full h-full cursor-pointer hover:text-orange-500"
              onClick={handleRemoveOption}
            />
          </div>
          <div
            className="w-8 h-8 my-3 bg-gray-200 rounded-md p-2 text-black hover:text-orange-500 cursor-pointer"
            onClick={handleMoreOptions}
          >
            <img
              alt="..."
              src="/plus.svg"
              className="object-cover w-full h-full cursor-pointer hover:text-orange-500"
            />
          </div>
        </div>
      </div>

      {optionsIndexes.map((index) => {
        // console.log("Here at index: ", index);
        return (
          <div className="flex border bg-white items-center mb-2 border-gray-400">
            <p className="ml-2 text-gray-700">{index + 1}. </p>
            <textarea
              value={optionTexts[index]}
              onChange={(event) => handleOnChange(event, index)}
              cols={100}
              wrap="soft"
              className="text-gray-700 p-2 w-full text-sm h-10 outline-none"
            ></textarea>
          </div>
        );
      })}
    </div>
  );
}
