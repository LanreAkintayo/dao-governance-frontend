import Option from "./Option";
import Link from "next/link";
import { Blockie, Tooltip } from "web3uikit";
import { now, toMilliseconds } from "../utils/helper";
import { IOption, Proposal } from "../types";

export default function ProposalCard({ proposal }: {proposal: Proposal}) {
  let status = proposal?.status;
 
  // const startDate: number = toMilliseconds(
  //   Number(proposal.startDate)
  // );
  // const duration: number = toMilliseconds(
  //   Number(proposal.duration)
  // );
  // const endDate: number = startDate + duration;

  // if (now() > endDate) {
  //   status = "Closed";
  // } else if (now() > startDate) {
  //   status = "Active";
  // } else {
  //   status = "Pending";
  // }



  let color;
  let bgColor;
  if (status == "Active") {
    color = "text-green-700";
    bgColor = "bg-green-200";
  } else if (status == "Pending") {
    color = "text-blue-700";
    bgColor = "bg-blue-200";
  } else {
    color = "text-red-700";
    bgColor = "bg-red-200";
  }

  // console.log("Number(proposal.id)", Number(proposal?.id))
  return (
    
    <Link href={`/proposals/${Number(proposal?.id)}`}>
      <a>
        <div className="rounded-md border border-gray-400 bg-white hover:border hover:border-gray-800 focus:bg-blue-700 w-full mt-5 p-3 px-2 sm:px-11">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center"> 
              <Tooltip content={proposal?.creator} position="top">
                <Blockie seed={proposal?.creator} size={6} />
              </Tooltip>
              <p className="px-3">
                {proposal?.creator.substring(0, 4)}...
                {proposal?.creator.substring(
                  proposal?.creator.length - 4,
                  proposal?.creator.length
                )}
              </p>
            </div>
            {/* <p className={`rounded-md text-xs px-2 ${color} p-1 ${bgColor}`}>
              {status}
            </p> */}
          </div>
          <h1 className="text-sm xs:text-base sm:text-xl mt-2 text-gray-900">{proposal?.title}</h1>
          <p className="sm:text-sm hidden sm:block text-xs mt-2 text-gray-500">{proposal?.description}</p>
          {/* <div className="my-4">
            {proposal?.optionsArray?.map((option:IOption) => {
              const percentages = proposal.optionsArray.map((option:IOption) => option.optionPercentage) as unknown as number[]
              const maxPercentage = Math.max(...percentages)
              // console.log("Options:::::::::::::::::: ", proposal.optionsArray);
              return <Option option={option} proposal={proposal} maxPercentage={maxPercentage} key={option.optionIndex}/>;
            })}
          </div> */}
        </div>
      </a>
    </Link>
  );
}
