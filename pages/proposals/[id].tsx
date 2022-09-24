import { NextPage } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ResultSection from "../../components/ResultSection";
import { getProposalsId, getProposalsData } from "../../lib/fetchProposals";
import { formatTime, now, toMilliseconds, toWei } from "../../utils/helper";
import { useEffect, useState } from "react";
import { abi, contractAddresses, erc20Abi, larAddress } from "../../constants";
import { useChain, useMoralis, useWeb3Contract } from "react-moralis";
import useSWR, { useSWRConfig } from "swr";
import VotersTable from "../../components/VotersTable";
import Link from "next/link";
import QuadraticVote from "../../components/QuadraticVote";
import SingleChoiceVote from "../../components/SingleChoiceVote";
import WeightedVote from "../../components/WeightedVote";
import VoteModal from "../../components/VoteModal";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";
import VotingPower from "../../components/VotingPower";
import { optionCSS } from "react-select/dist/declarations/src/components/Option";

const Proposal: NextPage = ({ proposal }) => {
  // console.log("All voters: ", proposal.allVoters);
  interface VotingSystem {
    [key: string]: string;
  }
  const votingSystem = {
    0: "Single Choice Voting",
    1: "Weighted Voting",
    2: "Quadratic Voting",
  };

  const { promiseInProgress } = usePromiseTracker();
  const dispatch = useNotification();
  const {mutate}  = useSWRConfig()

  const proposalsType: string = proposal.proposalType;
  const proposalVotingSystem: string = votingSystem[proposalsType];
  const startDate = formatTime(proposal.startDate);
  const endDate = formatTime(proposal.endDate);
  const [proposalData, setProposalData] = useState({
    ...proposal,
  });

  const {
    isWeb3Enabled,
    chainId: chainIdHex,
    enableWeb3,
    Moralis,
  } = useMoralis();
  const { switchNetwork, chain, account } = useChain();

  // console.log("Chain: ", chain)

  const chainId: number = parseInt(chainIdHex?.toString());

  const length = contractAddresses[chainId]?.length;

  // console.log("Contract Addresses: ", contractAddresses);
  // console.log("chainId: ", chainId);
  const daoAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;

  const [votingIndex, setVotingIndex] = useState([]);
  const [votingPower, setVotingPower] = useState([]);
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [indexToVotingPower, setIndexToVotingPower] = useState({});

  // console.log("Dao address: ", daoAddress);
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

  // console.log("proposalData.allVoters", proposalData.allVoters);

  const {
    runContractFunction: voteProposalByQuadratic,
    isFetching: isFetchingQ,
    isLoading: isLoadingQ,
  } = useWeb3Contract();

  const {
    runContractFunction: voteProposalBySingleChoice,
    isFetching: isFetchingS,
    isLoading: isLoadingS,
  } = useWeb3Contract();

  const handleVote = async () => {
    console.log("About to handle vote: ", votingPower);

    const provider = await enableWeb3();

    console.log("Can it be this? ");
    const lar = new ethers.Contract(larAddress, erc20Abi, provider);

    const signer = provider?.getSigner(account);

    const id = proposalData.id;
    const indexes = Object.keys(votingPower).filter(
      (key) => votingPower[key] > 0
    );
    const votingPowers = Object.values(votingPower)
      .map((votingPower) => toWei(votingPower))
      .filter((votingPower) => Number(votingPower) > 0);
    const votingPowerSum: string = votingPowers
      .reduce((a, b) => {
        return BigInt(a) + BigInt(b);
      }, 0)
      .toString();

    const approveTx = await trackPromise(
      lar.connect(signer).approve(daoAddress, votingPowerSum)
    );
    await trackPromise(approveTx.wait(1));

    if (proposalData.proposalType == "1") {
      voteProposalByQuadratic({
        params: {
          abi: abi,
          contractAddress: daoAddress,
          functionName: "voteProposalByWeighing",
          params: {
            id,
            indexes,
            votingPower: votingPowers,
          },
        },
        onSuccess: handleSuccess,
        onError: (error) => {
          handleFailure(error);
        },
      });
    } else if (proposalData.proposalType == "2") {
      voteProposalByQuadratic({
        params: {
          abi: abi,
          contractAddress: daoAddress,
          functionName: "voteProposalByQuadratic",
          params: {
            id,
            indexes,
            votingPower: votingPowers,
          },
        },
        onSuccess: handleSuccess,
        onError: (error) => {
          handleFailure(error);
        },
      });
    }
  };

  const getTotalVotes = (options: Array<Array<string>>): number => {
    let totalVotes: number = 0;
    options.forEach((option) => {
      totalVotes += Number(option[2]);
    });
    return totalVotes;
  };

  const getLatestOptions = async (id: string): Promise<Array<string[]>> => {
    const AllVotes: string = Moralis.Object.extend("Votes");
    const votesQuery = new Moralis.Query(AllVotes);

    votesQuery.descending("block_timestamp");
    votesQuery.equalTo("uid", id);

    const lastVote = await votesQuery.first();

    const latestOptions = lastVote?.attributes.proposalOptions;
    return latestOptions;
  };

  const getLatestProposal = async () => {
    try {
      const Proposals = Moralis.Object.extend("Proposals");
      const proposalsQuery = new Moralis.Query(Proposals);
      proposalsQuery.equalTo("uid", proposalData.id);
      const proposal = await proposalsQuery.first();

      const proposalAttribute = proposal?.attributes;

      const latestOptions = await getLatestOptions(proposalAttribute?.uid);
      const validOptions: Array<Array<string>> =
        latestOptions == undefined ? proposalAttribute?.options : latestOptions;

      const provider = await enableWeb3();
  
      const daoContract = new ethers.Contract(daoAddress, abi, provider);
      const allVoters = await daoContract.getVoters(proposalData.id);

      const totalVotes = getTotalVotes(validOptions);

      const optionsArray = validOptions.map((option) => {
        console.log("Option 2: ", option[2]);
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
        Number(proposalAttribute?.startDate)
      );
      const duration: number = toMilliseconds(
        Number(proposalAttribute?.duration)
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

      const finalProposal = {
        id: proposalAttribute?.uid,
        creator: proposalAttribute?.creator,
        description: proposalAttribute?.description,
        duration: proposalAttribute?.duration,
        proposalStatus: proposalAttribute?.proposalStatus,
        proposalType: proposalAttribute?.proposalType,
        latestOptions: latestOptions || null,
        startDate,
        endDate,
        status,
        timeLeft,
        title: proposalAttribute?.title,
        optionsArray,
        validOptions,
        allVoters,
      };

      console.log("This is the final proposal: ", finalProposal);

      return finalProposal;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSingleVote = async () => {
    const id = proposalData.id;
    const index = Object.keys(indexToVotingPower)[0];
    const votingPower = toWei(Object.values(indexToVotingPower)[0]);

    const provider = await enableWeb3();
    const lar = new ethers.Contract(larAddress, erc20Abi, provider);
    const signer = provider?.getSigner(account);

    const approveTx = await trackPromise(
      lar.connect(signer).approve(daoAddress, votingPower)
    );
    await trackPromise(approveTx.wait(1));

    voteProposalBySingleChoice({
      params: {
        abi: abi,
        contractAddress: daoAddress,
        functionName: "voteProposalBySingleChoice",
        params: {
          id,
          index,
          votingPower,
        },
      },
      onSuccess: handleSuccess,
      onError: (error) => {
        handleFailure(error);
      },
    });
  };

  const handleVoteModal = () => {
    setVoteModalOpen((prev) => !prev);
  };

  // const {
  //   data: allVoters,
  //   error,
  //   mutate,
  // } = useSWR(
  //   () => (isWeb3Enabled ? "web3/allVoters" : null),
  //   async () => {
  //     const provider = await enableWeb3();

  //     if (provider && daoAddress) {
  //       const daoContract = new ethers.Contract(daoAddress, abi, provider);
  //       const allVoters: string = await daoContract.getVoters(proposalData.id);

  //       return allVoters;
  //     }
  //   }
  // );

  const handleSuccess = async (tx) => {
    console.log("Success transaction: ", tx);
    await trackPromise(tx.wait(1));
    // updateUIValues()
    dispatch({
      type: "success",
      message: "Transaction Completed!",
      title: "Transaction Notification",
      position: "topR",
    });
    const newProposal = await getLatestProposal();

    console.log("New Proposal: ", newProposal);
    setProposalData({ ...newProposal });
    mutate("web3/votingPower")
    setIndexToVotingPower({})
  };

  const handleFailure = async (error) => {
    console.log("Error: ", error);
    dispatch({
      type: "error",
      message: "Transation Failed",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  // console.log("Index to voting power: ", indexToVotingPower);

  // console.log("options in id.tsx", proposalData.validOptions)
  return (
    <div className="flex flex-col justify-between bg-gray-50 h-full">
      <div>
        <Header />
        <div className="flex justify-between items-center px-4">
          <Link href="/proposals">
            <button className="hover:text-gray-800 mt-24 mx-8 mb-6 text-gray-400">
              ← Back
            </button>
          </Link>
          <VotingPower className="mt-24 mx-8 mb-4 border px-4" />
        </div>

        <div className="flex mx-4">
          <div className="w-8/12 p-2 pl-4 pr-11 ">
            <h1 className="text-2xl">{proposalData.title}</h1>
            <div className="mt-4 ">
              <h1 className="text-lg py-2 text-gray-700">Description</h1>
              <p className="text-gray-700">{proposalData.description}</p>
            </div>

            {proposalData?.proposalType == "0" && (
              <SingleChoiceVote
                indexToVotingPower={indexToVotingPower}
                setIndexToVotingPower={setIndexToVotingPower}
                options={proposalData.optionsArray}
                isFetching={isFetchingS}
                isLoading={isLoadingS}
                handleSingleVote={handleSingleVote}
              />
            )}
            {proposalData?.proposalType == "2" && (
              <QuadraticVote
                setVotingIndex={setVotingIndex}
                votingIndex={votingIndex}
                votingPower={votingPower}
                setVotingPower={setVotingPower}
                options={proposalData.optionsArray}
                handleVote={handleVote}
                isFetching={isFetchingQ}
                isLoading={isLoadingQ}
              />
            )}
            {proposalData?.proposalType == "1" && (
              <QuadraticVote
                setVotingIndex={setVotingIndex}
                votingIndex={votingIndex}
                votingPower={votingPower}
                setVotingPower={setVotingPower}
                options={proposalData.optionsArray}
                handleVote={handleVote}
                isFetching={isFetchingQ}
                isLoading={isLoadingQ}
              />
            )}

            {proposalData?.allVoters && (
              <VotersTable
                allVoters={proposalData.allVoters}
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
            {proposalData?.optionsArray && (
              <ResultSection options={proposalData.optionsArray} />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center text-center sm:block sm:p-0 mt-2 scrollbar-hide">
        {voteModalOpen && <VoteModal handleVoteModal={handleVoteModal} />}
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
