import { NextPage } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ResultSection from "../../components/ResultSection";
import { getProposalsId, getProposalsData } from "../../lib/fetchProposals";
import { formatTime } from "../../utils/helper";
import { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { useChain, useMoralis, useWeb3Contract } from "react-moralis";
import useSWR from "swr";
import VotersTable from "../../components/VotersTable";
import Link from "next/link";
import QuadraticVote from "../../components/QuadraticVote";
import SingleChoiceVote from "../../components/SingleChoiceVote";
import WeightedVote from "../../components/WeightedVote";

const Proposal: NextPage = ({ proposal }) => {
  // console.log("Proposal: ", proposal)
  interface VotingSystem {
    [key: string]: string;
  }
  const votingSystem = {
    0: "Single Choice Voting",
    1: "Weighted Voting",
    2: "Quadratic Voting",
  };

  const proposalsType: string = proposal.proposalType;
  const proposalVotingSystem: string = votingSystem[proposalsType];
  const startDate = formatTime(proposal.startDate);
  const endDate = formatTime(proposal.endDate);
  const [proposalData, setProposalData] = useState({
    ...proposal,
  });

  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const { switchNetwork, chain, account } = useChain();

  const chainId: number = parseInt(chainIdHex?.toString());

  const length = contractAddresses[chainId]?.length;
  const daoAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;

  const [votingIndex, setVotingIndex] = useState([])
  const [votingPower, setVotingPower] = useState([])

  const {
    runContractFunction: getVoters,
    isFetching: isFetchingVoters,
    isLoading: isLoadindVoters,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: daoAddress,
    functionName: "getVoters",
    params: {
      id: proposalData.id,
    },
  });

  const {
    data: allVoters,
    error,
    mutate,
  } = useSWR(
    () => (isWeb3Enabled ? "web3/allVoters" : null),
    async () => {
      const allVoters = await getVoters({
        onSuccess: (tx) => console.log("all Project", tx),
        onError: (error) => console.log(error),
      });
      // console.log("All voters: ", allVoters);

      return allVoters;
    }
  );

  // console.log("options in id.tsx", proposalData.validOptions)
  return (
    <div className="flex flex-col justify-between bg-gray-50 h-full">
      <div>
        <Header />
        <Link href="/proposals">
          <button className="hover:text-gray-800 mt-24 mx-8 mb-6 text-gray-400">
            ← Back
          </button>
        </Link>

        <div className="flex mx-4">
          <div className="w-8/12 p-2 pl-4 pr-11 ">
            <h1 className="text-2xl">{proposalData.title}</h1>
            <div className="mt-4 ">
              <h1 className="text-lg text-gray-700">Description</h1>
              <p className="text-gray-700">{proposalData.description}</p>
            </div>
            
            {proposalData.proposalType == "0" && <SingleChoiceVote />}
            {proposalData.proposalType == "1" && <WeightedVote />}
            {proposalData.proposalType == "2" && <QuadraticVote setVotingIndex={setVotingIndex} votingIndex={votingIndex} votingPower={votingPower} setVotingPower={setVotingPower} options={proposalData.optionsArray}/>}
            
            {allVoters && (
              <VotersTable
                allVoters={allVoters}
                options={proposalData.validOptions}
              />
            )}
          </div>
          <div className="w-4/12 rounded-md  text-sm">
            <div className="shadow bg-white p-3 w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Information
              </h1>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Voting System</p>
                <p>{votingSystem[proposalData.proposalType]}</p>
              </div>
              <div className="flex pt-2 items-center justify-between">
                <p className="text-gray-700">Start Date</p>
                <p>{startDate}</p>
              </div>
              <div className="flex pt-2 items-center justify-between">
                <p className="text-gray-700">End Date</p>
                <p>{endDate}</p>
              </div>
            </div>

            <ResultSection options={proposalData.optionsArray} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  console.log("We are here");
  const paths = await getProposalsId();

  console.log("Paths", paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const proposal = await getProposalsData(params.id);
  return {
    props: {
      proposal,
    },
  };
}
export default Proposal;
