import { Proposal } from "../pages/proposals";
import { fromWei, inDollarFormat } from "../utils/helper";

export default function Option({
  option,
  proposal,
  maxPercentage,
}: {
  option: {
    optionIndex: string;
    optionText: string;
    optionVote: string;
    optionPercentage: string;
  };
  proposal:Proposal;
  maxPercentage: number
}) {
  // console.log("Option Texttttttt: ", option?.optionText)
  const isMax = () => {
    if (
      Number(option?.optionPercentage) == maxPercentage &&
      proposal.status == "Closed"
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="bg-gray-50 lg:h-9 h-8 mt-2 text-xs lg:text-base border rounded-md border-gray-100 dark:bg-gray-700 relative">
      <div
        className={`lg:h-9 h-8 absolute top-0 rounded-md ${
          isMax() ? "bg-green-200" : "bg-gray-300"
        }`}
        style={{ width: `${option?.optionPercentage}%` }}
      ></div>
      <div className="absolute px-4 w-full text-xs h-full flex justify-between items-center">
        <p>
          {option?.optionText}{" "}
          {/*{inDollarFormat(Number(fromWei(option?.optionVote)))} LAR */}
        </p>
        <p>{option?.optionPercentage}%</p>
      </div>
    </div>
  );
}
