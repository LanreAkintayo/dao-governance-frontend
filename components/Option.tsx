import { fromWei, inDollarFormat } from "../utils/helper";

export default function Option({option}){
    // console.log("Option: ", option)
    return (
        <div className="bg-gray-50 h-9 mt-2 border rounded-md border-gray-100 dark:bg-gray-700 relative">
          <div
            className={`h-9 absolute top-0 rounded-md bg-gray-300`}
            style={{ width: `${option?.optionPercentage}%` }}
          ></div>
          <div className="absolute px-4 w-full h-full flex justify-between items-center">
            <p>{option?.optionText} {inDollarFormat(Number(fromWei(option?.optionVote)))} LAR</p>
            <p>{option?.optionPercentage}%</p>
          </div>
        </div>
    )
}