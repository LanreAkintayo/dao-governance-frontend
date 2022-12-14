import type { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Tooltip, Blockie } from "web3uikit";
import { useMoralis } from "react-moralis";
import useSWR from "swr";
import { now, toMilliseconds } from "../utils/helper";
import ProposalCard from "../components/ProposalCard";
import { ScaleLoader } from "react-spinners";

export interface Proposal {
  id: string;
  creator: string;
  description: string;
  duration: number;
  proposalStatus: string;
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

const Proposals: NextPage = () => {
  const { Moralis, isInitialized, isWeb3Enabled } = useMoralis();

  // console.log(isWeb3Enabled);

  const getLatestOptions = async (id: string): Promise<Array<string[]>> => {
    const AllVotes: string = Moralis.Object.extend("Votes");
    const votesQuery = new Moralis.Query(AllVotes);

    votesQuery.descending("block_timestamp");
    votesQuery.equalTo("uid", id);

    const lastVote = await votesQuery.first();

    const latestOptions = lastVote?.attributes.proposalOptions;

    return latestOptions;
  };

  const {
    data: allProposals,
    error,
    mutate,
  } = useSWR(
    () => (isWeb3Enabled ? "web3/proposals" : null),
    async () => {
      console.log("Is Initialized? ", isInitialized);
      console.log("Fetching Proposals......");

      const Proposals = Moralis.Object.extend("Proposals");
      const proposalsQuery = new Moralis.Query(Proposals);
      proposalsQuery.descending("uid_decimal");

      const proposals = await proposalsQuery.find();

      const sortedProposals = proposals.map(async (proposal) => {
        const proposalAttribute = proposal.attributes;

        const latestOptions = await getLatestOptions(proposalAttribute.uid);

        console.log("Latest option: ", latestOptions);
        const validOptions: string[][] =
          latestOptions == undefined
            ? proposalAttribute.options
            : latestOptions;

        const totalVotes = getTotalVotes(validOptions);

        const optionsArray = validOptions.map((option) => {
          // console.log("Option 2: ", option[2]);
          const percentage =
            totalVotes != 0
              ? ((Number(option[2]) / totalVotes) * 100).toFixed(1)
              : 0;

          return {
            optionIndex: option[0],
            optionText: option[1],
            optionVote: option[2],
            optionPercentage: percentage.toString(),
          };
        });

        const startDate: number = toMilliseconds(
          Number(proposalAttribute.startDate)
        );
        const duration: number = toMilliseconds(
          Number(proposalAttribute.duration)
        );
        const endDate: number = startDate + duration;

        const timeLeft: number =
          startDate + duration - now() < 0 ? 0 : startDate + duration - now();
        let status: string;

        if (now() > endDate) {
          status = "Closed";
        } else if (now() > startDate) {
          status = "Active";
        } else {
          status = "Pending";
        }

        const finalProposal: Proposal = {
          id: proposalAttribute.uid,
          creator: proposalAttribute.creator,
          description: proposalAttribute.description,
          duration: proposalAttribute.duration,
          proposalStatus: proposalAttribute.proposalStatus,
          proposalType: proposalAttribute.proposalType,
          latestOptions,
          startDate,
          endDate,
          status,
          timeLeft,
          title: proposalAttribute.title,
          optionsArray,
          validOptions,
        };

        return finalProposal;
      });

      const resolved = await Promise.all(sortedProposals);

      // console.log(resolved);

      return resolved;
    }
  );

  console.log("All Proposals length: ", allProposals?.length);

  return (
    <div
      className={`flex flex-col ${
        (!allProposals || allProposals?.length == 0) && "h-screen"
      } justify-between  bg-gray-50`}
    >
      <div>
        <Header />
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

            {!allProposals && isWeb3Enabled && (
              <div className="flex flex-col w-full my-4 items-center">
                <div className="my-1">
                  <ScaleLoader color="black" loading={true} />
                </div>

                <p className="text-gray-500">Please Wait a few seconds</p>
              </div>
            )}
            {!isWeb3Enabled && (
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
              return <ProposalCard proposal={proposal} key={proposal.id}/>;
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

export default Proposals;
