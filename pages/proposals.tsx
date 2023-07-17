import type { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Tooltip, Blockie } from "web3uikit";
import { useMoralis } from "react-moralis";
import useSWR from "swr";
import { now, toMilliseconds } from "../utils/helper";
import ProposalCard from "../components/ProposalCard";
import { ScaleLoader } from "react-spinners";
import useProposals from "../hooks/useProposals";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "../types";

export interface Proposal {
  id: string;
  creator: string;
  description: string;
  duration: number;
  proposalStatus: number;
  proposalType: string;
  latestOptions: string[][] | undefined;
  startDate: number;
  endDate: number;
  status: string;
  timeLeft: number;
  title: string;
  optionsArray: {
    optionIndex: string;
    optionText: string;
    optionVote: string;
    optionPercentage: string;
  }[];
  validOptions: string[][];
}
const getTotalVotes = (options: Array<Array<string>>): number => {
  let totalVotes: number = 0;
  options.forEach((option) => {
    totalVotes += Number(option[2]);
  });
  return totalVotes;
};

const Proposals: NextPageWithLayout = () => {
  // const { Moralis, isInitialized, isWeb3Enabled } = useMoralis();

  // console.log(isWeb3Enabled);

  // const getLatestOptions = async (id: string): Promise<Array<string[]>> => {
  //   const AllVotes: string = Moralis.Object.extend("Votes");
  //   const votesQuery = new Moralis.Query(AllVotes);

  //   votesQuery.descending("block_timestamp");
  //   votesQuery.equalTo("uid", id);

  //   const lastVote = await votesQuery.first();

  //   const latestOptions = lastVote?.attributes.proposalOptions;

  //   return latestOptions;
  // };

  /*
  proposal1 = {
      id: 1,
      creator: "0x123",
      description: "This is the description",
      duration: 12345 (in seconds),
      proposalStatus: 0 (Pending) | 1 (Active) | 2 (Closed),
      proposalType: "Weighted Voting" | Quadratic Voting | Single Choice Voting,
      latestOptions: [[optionIndex1, optionText1, optionVote1, optionPercentage1], [optionIndex2, optionText2, optionVote2, optionPercentage2]]
      startDate 12345 (in seconds),
      endDate: 12345 (in seconds),
      status: closed | Active | Pending,
      timeLeft: 123 (in seconds),
      title: This is the title of the proposal,
      optionsArray: [[optionIndex1, optionText1, optionVote1, optionPercentage1], [optionIndex2, optionText2, optionVote2, optionPercentage2]]
      validOptions: [[optionIndex1, optionText1, optionVote1, optionPercentage1], [optionIndex2, optionText2, optionVote2, optionPercentage2]]


  allProposals = [proposal1, proposal2, proposal3, e.t.c.]
  
  }
  
  
   */

 const {allProposals} = useProposals()

  console.log("All Proposals length: ", allProposals);

  return (
    <div
      className={`flex flex-col ${
        (!allProposals || allProposals?.length == 0) && "h-screen"
      } justify-between  bg-gray-50`}
    >
      <div>
        {/* <Header /> */}
        <section className="px-5 mt-24 flex flex-col items-center ">
          {/* <div className="flex justify-center"> 
            <div className="p-2 w-80 rounded-md bg-white shadow">
              <p className="text-lg text-gray-700">Proposals Created</p>
              <p className="text-xl">100</p>
            </div>
            <div className="p-2 w-80 ml-4 rounded-md bg-white shadow">
              <p className="text-lg text-gray-700">Proposals Ongoing</p>
              <p className="text-xl">30</p>
            </div>
          </div> */}

          <div className=" lg:w-9/12 w-11/12">
            <h1 className="text-xl text-gray-700 py-4 ">Proposals</h1>

            {!allProposals  && (
              <div className="flex flex-col w-full my-4 items-center">
                <div className="my-1">
                  <ScaleLoader color="black" loading={true} />
                </div>

                <p className="text-gray-500">Please Wait a few seconds</p>
              </div>
            )}
            {!true && (
              <div className="flex flex-col my-4 p-2 text-orange-800 jusify-center items-center">
                <p className="text-center p-2 px-10 w-96 bg-orange-200">
                  Connect Your Wallet
                </p>
              </div>
            )}

            {allProposals && allProposals.length == 0 && (
              <div className="w-full text-center">
                <p className="my-12">No Proposals at the moment</p>
              </div>
            )}

            {allProposals?.map((proposal) => {
              return <ProposalCard proposal={proposal} key={proposal.id} />;
            })}
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};



Proposals.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


export default Proposals;
