import Option from "./Option";
import { Proposal } from "../pages/proposals";
import Link from "next/link";

export default function ProposalCard({ proposal }) {
  return (
    <Link href={`/proposals/${proposal.id}`}>
      <a>
        <div className="rounded-md shadow bg-white w-full mt-5 p-3 px-11">
          <div className="flex w-full justify-between items-center">
            <p>Account: </p>
            <p className="rounded-md text-red-700 p-1 bg-red-200">
              {proposal.status}
            </p>
          </div>
          <h1 className="text-xl mt-2 text-gray-900">{proposal.title}</h1>
          <p className="text-sm mt-2 text-gray-500">{proposal.description}</p>
          <div className="my-4">
            {proposal?.optionsArray?.map((option) => {
              console.log("Options: ", proposal.optionsArray);
              return <Option option={option} />;
            })}
          </div>
        </div>
      </a>
    </Link>
  );
}
