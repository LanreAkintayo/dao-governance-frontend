import { fromWei, inDollarFormat } from "../utils/helper";

export default function ResultSection({
  options,
}: {
  options: {
    optionIndex: string;
    optionText: string;
    optionVote: string;
    optionPercentage: string;
  }[];
}) {
  return (
    <div className="shadow bg-white p-3 pb-5  w-10/12 justify-center mt-8 sm:ml-4 lg:ml-0 lg:mt-4 sm:w-5/12 lg:w-10/12">
      <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
        Results
      </h1>
      {options.map((option) => {
        return (
          <div>
            <div className="w-full h-full mt-2  flex justify-between items-center">
              <p>
                <small>{option.optionText}</small>
              </p>
              <p>
                <small>
                  {inDollarFormat(Number(fromWei(option.optionVote)))} LAR{" "}
                  {option.optionPercentage}%
                </small>
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
