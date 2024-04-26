import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { range } from "../utils/helper";

export default function OptionsSection({
  noOfOptions,
  setNoOfOptions,
  optionsIndexes,
  setOptionsIndexes,
  optionTexts,
  setOptionTexts,
}: {
  noOfOptions: number;
  setNoOfOptions: Dispatch<SetStateAction<number>>;
  optionsIndexes: number[];
  setOptionsIndexes: Dispatch<SetStateAction<number[]>>;
  optionTexts: {
    [key: string]: string;
  };
  setOptionTexts: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
}) {
  useEffect(() => {
    // console.log("Options Indexes: .................", optionsIndexes);
    setOptionTexts((prev) => {
      return {
        ...prev,
      };
    });
  }, [optionsIndexes]);

  useEffect(() => {
    console.log(optionTexts);
    console.log(optionsIndexes);
  }, [optionsIndexes, optionTexts]);

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
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
    console.log(optionsIndexes);
    const indexes = range(0, noOfOptions);
    setOptionsIndexes(indexes);
  }, [noOfOptions]);

  const handleMoreOptions = () => {
    // console.log(optionsIndexes)
    setNoOfOptions((prev) => {
      const newNo = prev + 1;
      return newNo;
    });

    const indexes = range(0, noOfOptions);
    setOptionsIndexes(indexes);
  };
  const handleRemoveOption = () => {
    if (noOfOptions >= 3) {
      setNoOfOptions((prev) => {
        const newNo = prev - 1;

        console.log(newNo);
        return newNo;
      });

      const indexes = range(0, noOfOptions);
      setOptionsIndexes(indexes);
    }

    // // console.log(optionsIndexes)
    // const index = optionsIndexes.length - 1;
    // setOptionsIndexes((prevIndexes) => {
    //   const indexes = prevIndexes;
    //   //   console.log("Indexes initially: ", indexes);
    //   //   console.log("Index to slice:", index);
    //   indexes.splice(index, 1);

    //   //   console.log("Indexes after splicing: ", indexes);

    //   return indexes;
    // });

    // setNoOfOptions((prev) => {
    //   const newOne = prev - 1;
    //   return newOne;
    // });
  };

  return (
    <div className="mt-3 lg:w-10/12 border border-gray-400 px-4 py-3">
      <div className="flex items-center justify-between">
        <p className="text-gray-700 ss:text-sm text-xs">
          <small>Choices</small>
        </p>
        <div className="flex items-center">
          <div
            className="h-8 mr-2 flex items-center bg-gray-200 rounded-md p-2 hover:bg-gray-300 text-black  cursor-pointer"
            // onClick={handleSidebar}
            onClick={handleRemoveOption}
          >
            <p className="px-2 whitespace-nowrap text-xs ssm:block hidden ssm:text-sm ">
              Remove Option
            </p>
            <img
              alt="..."
              src="/minus.png"
              className="object-cover w-full h-full cursor-pointer hover:text-orange-500"
            />
          </div>
          <div
            className="flex items-center h-8 my-3 bg-gray-200 rounded-md p-2 text-black hover:bg-gray-300 cursor-pointer"
            onClick={handleMoreOptions}
          >
            <p className="px-2 whitespace-nowrap text-xs ssm:block hidden sm:text-sm">
              Add Option
            </p>
            <img
              alt="..."
              src="/plus.svg"
              className="object-cover w-full h-full cursor-pointer hover:text-orange-500"
            />
          </div>
        </div>
      </div>

      {optionsIndexes.map((index) => {
        const currentKey = optionsIndexes.indexOf(index)
        return (
          <div key={currentKey} className="flex border bg-white items-center mb-2 border-gray-400">
            <p className="ml-2 text-gray-700">{index + 1}. </p>
            <textarea
              value={optionTexts[index]}
              onChange={(event) => handleOnChange(event, index)}
              cols={100}
              wrap="soft"
              className="text-gray-700 ss:p-2 p-1 ss:text-sm text-xs w-full ss:h-10  outline-none"
            ></textarea>
          </div>
        );
      })}
    </div>
  );
}
