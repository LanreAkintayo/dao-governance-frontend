import { IOption } from "../types";
import { fromWei, inDollarFormat } from "../utils/helper";

export default function ResultSection({ options }: { options: IOption[] }) {
  return (
    <div className="shadow bg-white p-3 pb-5  w-full justify-center mt-8 sm:ml-4 lg:ml-0 lg:mt-4 sm:w-5/12 lg:w-10/12">
      <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
        Results
      </h1>
      {options.map((option) => {
        return (
          <div key={option.optionIndex} className="mt-3">
            <div className="w-full h-full mt-2 text-[11px] flex justify-between items-center">
              <p className="w-8/12 ">{option.optionText}</p>
              <p className="w-4/12 flex justify-end ">
                {inDollarFormat(Number(fromWei(option.optionVote)))} LAR{" "}
                {option.optionPercentage}%
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-3 shadow dark:bg-gray-700 relative">
              <div
                className={`h-3 absolute rounded-lg  top-0 bg-blue-400`}
                style={{ width: `${option.optionPercentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
