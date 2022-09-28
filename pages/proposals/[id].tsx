import { NextPage } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ResultSection from "../../components/ResultSection";
import {
  getProposalsId,
  getProposalsData,
  Proposal,
  IParam,
  Voter,
} from "../../lib/fetchProposals";
import { formatTime, now, toMilliseconds, toWei } from "../../utils/helper";
import { useEffect, useState } from "react";
import { abi, contractAddresses, erc20Abi, larAddress } from "../../constants";
import { useChain, useMoralis, useWeb3Contract } from "react-moralis";
import useSWR, { useSWRConfig } from "swr";
import VotersTable from "../../components/VotersTable";
import Link from "next/link";
import QuadraticVote from "../../components/QuadraticVote";
import SingleChoiceVote from "../../components/SingleChoiceVote";
import { ContractTransaction, Signer } from "ethers";
import VotingPower from "../../components/VotingPower";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { Blockie, Tooltip, useNotification } from "web3uikit";
import Moralis from "moralis/types";
import { displayToast } from "../../components/Toast";
import { ToastContainer } from "react-toastify";

export default function ID({ proposal }: { proposal: Proposal }) {
  // console.log("All voters: ", proposal.allVoters);
  interface VotingSystem {
    [key: string]: string;
  }

  console.log("Proposal:::::::::::::::::::: ", proposal);
  const votingSystem: VotingSystem = {
    "0": "Single Choice Voting",
    "1": "Weighted Voting",
    "2": "Quadratic Voting",
  };

  const { promiseInProgress } = usePromiseTracker();
  const dispatch = useNotification();
  const { mutate } = useSWRConfig();

  const proposalsType: string = proposal?.proposalType;
  const proposalVotingSystem: string = votingSystem[proposalsType];
  const startDate = formatTime(proposal?.startDate);
  const endDate = formatTime(proposal?.endDate);
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

  const chainId: number = parseInt(chainIdHex!);

  const length = chainId && contractAddresses[chainId?.toString()]?.length;

  console.log("Length: ", length);
  // console.log("Contract Addresses: ", contractAddresses);
  // console.log("chainId: ", chainId);
  const daoAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;

  const [votingIndex, setVotingIndex] = useState([]);
  const [votingPower, setVotingPower] = useState<{ [key: string]: number }>({});
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [indexToVotingPower, setIndexToVotingPower] = useState<{
    [key: string]: number;
  }>({});

  // console.log("Dao address: ", daoAddress);
  const {
    runContractFunction: getVoters,
    isFetching: isFetchingVoters,
    isLoading: isLoadindVoters,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: daoAddress!,
    functionName: "getVoters",
    params: {
      id: proposalData?.id,
    },
  });

  // console.log("proposalData.allVoters", proposalData.allVoters);

  const {
    runContractFunction: voteProposalByQuadratic,
    isFetching: isFetchingQ,
    isLoading: isLoadingQ,
  } = useWeb3Contract({});

  const {
    runContractFunction: voteProposalBySingleChoice,
    isFetching: isFetchingS,
    isLoading: isLoadingS,
  } = useWeb3Contract({});

  const handleVote = async () => {
    // console.log("About to handle vote: ", votingPower);

    const id = proposalData?.id;
    const keys: string[] = Object.keys(votingPower);

    const indexes = keys.filter((key) => votingPower[key] > 0);
    const votingPowers = Object.values(votingPower)
      .map((votingPower) => toWei(votingPower))
      .filter((votingPower) => Number(votingPower) > 0);
    const votingPowerSum: string = votingPowers
      .reduce((a, b: string) => {
        return Number(BigInt(a) + BigInt(b));
      }, 0)
      .toString();

    const approveOptions: Moralis.ExecuteFunctionOptions = {
      contractAddress: larAddress,
      functionName: "approve",
      abi: erc20Abi,
      params: {
        spender: daoAddress,
        amount: votingPowerSum,
      },
    };

    const tx: ContractTransaction = (await trackPromise(
      Moralis.executeFunction(approveOptions)
    )) as unknown as ContractTransaction;
    await trackPromise(tx.wait(1));

    //   const provider = await enableWeb3()
    //   const ethers = Moralis.web3Library;

    //   console.log("Can it be this? ");
    //   const lar = new ethers.Contract(larAddress, erc20Abi, provider);

    //   const signer = provider?.getSigner(account);

    // const approveTx: ContractTransaction = await trackPromise(
    //   lar.connect(signer).approve(daoAddress, votingPowerSum)
    // );
    // await trackPromise(approveTx.wait(1));

    if (proposalData?.proposalType == "1") {
      voteProposalByQuadratic({
        params: {
          abi: abi,
          contractAddress: daoAddress!,
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
    } else if (proposalData?.proposalType == "2") {
      voteProposalByQuadratic({
        params: {
          abi: abi,
          contractAddress: daoAddress!,
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

  const getTotalVotes = (options: string[][]): number => {
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
      proposalsQuery.equalTo("uid", proposalData?.id);
      const proposal = await proposalsQuery.first();

      const proposalAttribute = proposal?.attributes;

      const latestOptions = await getLatestOptions(proposalAttribute?.uid);
      const validOptions: Array<Array<string>> =
        latestOptions == undefined ? proposalAttribute?.options : latestOptions;

      const fetchOptions: Moralis.ExecuteFunctionOptions = {
        contractAddress: daoAddress!,
        functionName: "getVoters",
        abi: abi,
        params: {
          id: proposalData?.id,
        },
      };

      const allVoters = (await trackPromise(
        Moralis.executeFunction(fetchOptions)
      )) as any[][];

      // const provider = await enableWeb3();

      // const daoContract = new ethers.Contract(daoAddress!, abi, provider);
      // const allVoters:any[][] = await daoContract.getVoters(proposalData.id);

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

      // console.log("This is the final proposal: ", finalProposal);

      return finalProposal;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSingleVote = async () => {
    const id = proposalData?.id;
    const index = Object.keys(indexToVotingPower)[0];
    const votingPower = toWei(Object.values(indexToVotingPower)[0]);

    const approveOptions = {
      contractAddress: larAddress,
      functionName: "approve",
      abi: erc20Abi,
      params: {
        spender: daoAddress,
        amount: votingPower,
      },
    };

    const tx = (await trackPromise(
      Moralis.executeFunction(approveOptions)
    )) as ContractTransaction;
    await trackPromise(tx.wait(1));

    // const provider = await enableWeb3();
    // const lar = new ethers.Contract(larAddress, erc20Abi, provider);
    // const signer = provider?.getSigner(account);

    // const approveTx: ContractTransaction = await trackPromise(
    //   lar.connect(signer).approve(daoAddress, votingPower)
    // );
    // await trackPromise(approveTx.wait(1));

    voteProposalBySingleChoice({
      params: {
        abi: abi,
        contractAddress: daoAddress!,
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

  const handleSuccess = async (results: unknown) => {
    const tx = results as ContractTransaction;
    console.log("Success transaction: ", tx);
    await trackPromise(tx.wait(1));
    // updateUIValues()
    window.alert("Yay! Transaction sucessful")

    // displayToast("success");
    // dispatch({
    //   type: "success",
    //   message: "Transaction Completed!",
    //   title: "Transaction Notification",
    //   position: "topR",
    // });
    const newProposal = (await getLatestProposal()) as Proposal;

    // console.log("New Proposal: ", newProposal);
    setProposalData({ ...newProposal });
    mutate("web3/votingPower");
    setIndexToVotingPower({});
  };

  const handleFailure = async (error: Error) => {
    console.log("Error: ", error);
    window.alert("Oops! Transaction Failed")

    // displayToast("failure");

    // dispatch({
    //   type: "error",
    //   message: "Transation Failed",
    //   title: "Transaction Notification",
    //   position: "topR",
    // });
  };

  const creator = proposalData?.creator;
  const creatorLength = creator.length;
  const status = proposalData?.status;

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

  // console.log(proposalData?.validOptions);

  return (
    <div className="flex flex-col justify-between bg-gray-50">
      <Header />
      <div>
        <div className="flex ss:justify-between justify-start items-center px-4">
          <Link href="/proposals">
            <button className="hover:text-gray-800 mt-24 mx-8 mb-6 text-gray-400 sm:text-base text-xs">
              ← Back
            </button>
          </Link>
          <VotingPower className="mt-24 mx-4 ss:mx-8 mb-4 border px-4" />
        </div>

        <div className="flex lg:flex-row flex-col mx-4">
          <div className="w-full lg:w-8/12 p-2 pl-4 sm:pr-11 ">
            <h1 className="text-base ssm:text-lg sm:text-2xl">
              {proposalData?.title}
            </h1>
            <div className="flex items-center my-3">
              <p
                className={`rounded-full px-2 p-1 mr-3 sm:text-base text-sm ${color} ${bgColor} `}
              >
                {proposalData?.status}
              </p>
              <Tooltip content={creator} position={"top"}>
                <Blockie seed={creator} size={6} />
              </Tooltip>
              <p className="px-2 sm:text-base text-sm">
                {creator.substring(0, 4)}...
                {creator.substring(creatorLength - 4, creatorLength)}
              </p>
            </div>
            <div className="mt-4 ">
              <h1 className=" text-base sm:text-lg py-2 text-gray-700">
                Description
              </h1>
              <p className="text-gray-700 sm:text-base ss:text-sm text-xs">
                {proposalData?.description}
              </p>
            </div>

            <div className="w-full flex justify-center lg:justify-start">
              {proposalData?.proposalType == "0" &&
                proposalData?.status != "Closed" && (
                  <SingleChoiceVote
                    indexToVotingPower={indexToVotingPower}
                    setIndexToVotingPower={setIndexToVotingPower}
                    options={proposalData?.optionsArray}
                    isFetching={isFetchingS}
                    isLoading={isLoadingS}
                    handleSingleVote={handleSingleVote}
                  />
                )}
              {proposalData?.proposalType == "2" &&
                proposalData?.status != "Closed" && (
                  <QuadraticVote
                    votingPower={votingPower}
                    options={proposalData?.optionsArray}
                    handleVote={handleVote}
                    setVotingPower={setVotingPower}
                    isFetching={isFetchingQ}
                    isLoading={isLoadingQ}
                  />
                )}
              {proposalData?.proposalType == "1" &&
                proposalData?.status != "Closed" && (
                  <QuadraticVote
                    votingPower={votingPower}
                    options={proposalData?.optionsArray}
                    handleVote={handleVote}
                    setVotingPower={setVotingPower}
                    isFetching={isFetchingQ}
                    isLoading={isLoadingQ}
                  />
                )}
            </div>

            <div className="w-full flex justify-center lg:justify-start">
              {proposalData?.allVoters && (
                <VotersTable
                  allVoters={proposalData?.allVoters}
                  options={proposalData?.validOptions}
                />
              )}
            </div>
          </div>

          <div className="flex lg:flex-col sm:flex-row flex-col items-center justify-center lg:justify-start lg:w-4/12 rounded-md  text-sm">
            <div className="shadow bg-white p-3 mt-8 w-10/12 justify-center sm:w-5/12 lg:w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Information
              </h1>
              <div className="flex items-center justify-between">
                <p className="text-gray-700 lg:text-xs text-xs w-5/12">
                  Voting System
                </p>
                <p className="w-7/12 lg:text-xs text-xs">
                  {votingSystem[proposalData?.proposalType]}
                </p>
              </div>
              <div className="flex pt-2 items-center justify-between">
                <p className="text-gray-700 lg:text-xs text-xs w-5/12">
                  Start Date
                </p>
                <p className="lg:text-xs text-xs w-7/12">{startDate}</p>
              </div>
              <div className="flex pt-2 items-center justify-between">
                <p className="text-gray-700 lg:text-xs text-xs w-5/12">
                  End Date
                </p>
                <p className="lg:text-xs text-xs w-7/12">{endDate}</p>
              </div>
            </div>
            {proposalData?.optionsArray && (
              <ResultSection options={proposalData?.optionsArray} />
            )}
          </div>
        </div>
        <ToastContainer />
      </div>

      <Footer />
    </div>
  );
}

// export async function getStaticPaths() {

//   const paths = await getProposalsId();

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }: IParam) {
  // Fetch necessary data for the blog post using params.id
  const proposal = await getProposalsData(params.id);
  return {
    props:
      {
        proposal: proposal || null,
      } || null,
  };
}
