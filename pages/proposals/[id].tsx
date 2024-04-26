import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ResultSection from "../../components/ResultSection";
import { getProposalsData } from "../../lib/fetchProposals";
import { formatTime, toWei } from "../../utils/helper";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { daoAbi, erc20Abi, larAddress, daoAddress } from "../../constants";
import VotersTable from "../../components/VotersTable";
import Link from "next/link";
import QuadraticVote from "../../components/QuadraticVote";
import SingleChoiceVote from "../../components/SingleChoiceVote";
import VotingPower from "../../components/VotingPower";
import { displayToast } from "../../components/Toast";
import { ToastContainer } from "react-toastify";
import { Blockie, Tooltip } from "web3uikit";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  getAccount,
} from "@wagmi/core";
import { IParam, NextPageWithLayout, Proposal } from "../../types";
import Layout from "../../components/Layout";
import { useAccount } from "wagmi";

interface IDProps {
  proposal: Proposal;
}

const ID: NextPageWithLayout<IDProps> = ({
  proposal,
}: {
  proposal: Proposal;
}) => {
  interface VotingSystem {
    [key: string]: string;
  }

  // console.log("Proposal:::::::::::::::::::: ", proposal);
  const votingSystem: VotingSystem = {
    "0": "Single Choice Voting",
    "1": "Weighted Voting",
    "2": "Quadratic Voting",
  };

  const proposalsType: string = proposal?.proposalType;
  const proposalVotingSystem: string = votingSystem[proposalsType];
  const startDate = formatTime(proposal?.startDate);
  const endDate = formatTime(proposal?.endDate);
  const [proposalData, setProposalData] = useState({
    ...proposal,
  });

  const account = getAccount();
  const { isConnected, status: accountStatus } = useAccount();

  const [votingIndex, setVotingIndex] = useState([]);
  const [votingPower, setVotingPower] = useState<{ [key: string]: number }>({});
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [indexToVotingPower, setIndexToVotingPower] = useState<{
    [key: string]: number;
  }>({});

  const [sVoteText, setSVoteText] = useState("Vote");
  const [isVotingS, setIsVotingS] = useState(false);

  const [wVoteText, setSWoteText] = useState("Vote");
  const [isVotingW, setIsVotingW] = useState(false);

  const updateProposalData = async () => {
    console.log("Updating proposal data: ");
    // Updating proposal Data
    const latestProposal: Proposal = await getProposalsData(proposalData.id);

    console.log("proposal data updated ");
    console.log("Latest proposal: ", latestProposal);

    setProposalData(latestProposal);
  };

  const handleVote = async () => {
    // console.log("About to handle vote: ", votingPower);
    console.log("Handling vote");
    setIsVotingS(true);
    setSVoteText("Voting");

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

    try {
      setSVoteText("Approving LAR Token");

      console.log("We are here");

      const approveRequest = await prepareWriteContract({
        address: larAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [daoAddress, votingPowerSum],
      });

      const { hash } = await writeContract(approveRequest);

      console.log("We are now here");

      const approveReceipt = await waitForTransaction({
        hash,
      });

      console.log("Approve receipt: ", approveReceipt);
      // console.log('Deposit Receipt: ', depositReceipt);
      if (approveReceipt.status == "success") {
        displayToast("success", "LAR Token has successfully been approved");
        setSVoteText("Approved");
      } else {
        setSVoteText("Vote");
        setIsVotingS(false);

        displayToast("failure", "Failed to approve LAR Token");
        return;
      }
    } catch (error) {
      console.log("Error: ", error);
      setSVoteText("Vote");
      setIsVotingS(false);

      displayToast("Failure", "Transaction failed. Try again");
      return;
    }

    try {
      setSVoteText("Voting");
      if (proposalData?.proposalType == "1") {
        const voteRequest = await prepareWriteContract({
          address: daoAddress,
          abi: daoAbi,
          functionName: "voteProposalByWeighing",
          args: [id, indexes, votingPowers],
        });

        const { hash: voteHash } = await writeContract(voteRequest);

        const voteReceipt = await waitForTransaction({ hash: voteHash });

        if (voteReceipt.status == "success") {
          displayToast("success", "You've successfully voted");
          setSVoteText("Voted Successfully");

          await updateProposalData();
        } else {
          displayToast("failure", "Failed to Vote");
          setSVoteText("Voting Failed");
        }
      } else if (proposalData?.proposalType == "2") {
        const voteRequest = await prepareWriteContract({
          address: daoAddress,
          abi: daoAbi,
          functionName: "voteProposalByQuadratic",
          args: [id, indexes, votingPowers],
        });

        const { hash: voteHash } = await writeContract(voteRequest);

        const voteReceipt = await waitForTransaction({ hash: voteHash });

        if (voteReceipt.status == "success") {
          displayToast("success", "You've successfully voted");
          setSVoteText("Voted Successfully");

          await updateProposalData();
        } else {
          displayToast("failure", "Failed to Vote");
          setSVoteText("Voting Failed");
        }
      }
    } catch (err) {
      console.log("Error: ", err);
      displayToast("Failure", "Failed to vote");
      setSVoteText("Voting Failed");
    }

    setIsVotingS(false);
    setSVoteText("Vote");
  };

  const getTotalVotes = (options: string[][]): number => {
    let totalVotes: number = 0;
    options.forEach((option) => {
      totalVotes += Number(option[2]);
    });
    return totalVotes;
  };

  const handleSingleVote = async () => {
    console.log("Handling single vote");
    setIsVotingS(true);
    setSVoteText("Voting");
    const id = proposalData?.id;
    const index = Object.keys(indexToVotingPower)[0];
    const votingPower = toWei(Object.values(indexToVotingPower)[0]);

    try {
      setSVoteText("Approving LAR Token");

      const approveRequest = await prepareWriteContract({
        address: larAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [daoAddress, votingPower],
      });

      const { hash } = await writeContract(approveRequest);

      const approveReceipt = await waitForTransaction({
        hash,
      });

      // console.log('Deposit Receipt: ', depositReceipt);
      if (approveReceipt.status == "success") {
        displayToast("success", "LAR Token has successfully been approved");
        setSVoteText("Approved");
      } else {
        setSVoteText("Vote");
        setIsVotingS(false);

        displayToast("failure", "Failed to approve LAR Token");
        return;
      }
    } catch (error) {
      setSVoteText("Vote");
      setIsVotingS(false);

      displayToast("Failure", "Failed to approve LAR Token");
      return;
    }

    try {
      setSVoteText("Voting");

      const voteRequest = await prepareWriteContract({
        address: daoAddress,
        abi: daoAbi,
        functionName: "voteProposalBySingleChoice",
        args: [id, index, votingPower],
      });

      const { hash: voteHash } = await writeContract(voteRequest);

      const voteReceipt = await waitForTransaction({ hash: voteHash });

      if (voteReceipt.status == "success") {
        displayToast("success", "You've successfully voted");
        setSVoteText("Voted Successfully");

        await updateProposalData();
      } else {
        displayToast("failure", "Failed to Vote");
        setSVoteText("Voting Failed");
      }
    } catch (error) {
      displayToast("Failure", "Failed to vote");
      setSVoteText("Voting Failed");
    }

    setIsVotingS(false);
    setSVoteText("Vote");
  };

  const handleVoteModal = () => {
    setVoteModalOpen((prev) => !prev);
  };

  // const handleSuccess = async (results: unknown) => {
  //   const tx = results as ContractTransaction;
  //   console.log("Success transaction: ", tx);
  //   await trackPromise(tx.wait(1));
  //   // updateUIValues()
  //   window.alert("Yay! Transaction sucessful")

  //   // displayToast("success");
  //   // dispatch({
  //   //   type: "success",
  //   //   message: "Transaction Completed!",
  //   //   title: "Transaction Notification",
  //   //   position: "topR",
  //   // });
  //   const newProposal = (await getLatestProposal()) as Proposal;

  //   // console.log("New Proposal: ", newProposal);
  //   setProposalData({ ...newProposal });
  //   mutate("web3/votingPower");
  //   setIndexToVotingPower({});
  // };

  const handleFailure = async (error: Error) => {
    console.log("Error: ", error);
    window.alert("Oops! Transaction Failed");

    // displayToast("failure");

    // dispatch({
    //   type: "error",
    //   message: "Transation Failed",
    //   title: "Transaction Notification",
    //   position: "topR",
    // });
  };

  const creator = proposalData?.creator;
  const creatorLength = creator?.length;
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
    <div className="flex flex-col justify-between bg-gray-50 mb-8">
      <div>
        <div className="flex flex-row justify-between space-x-3 items-center px-8 mt-16 sm:mt-24">
          <Link href="/proposals">
            <button className="hover:text-gray-800ssm:mx-8 mb-6 text-gray-400 sm:text-base text-xs">
              ← Back
            </button>
          </Link>
          <VotingPower className="ssm:mx-4 ss:mx-8 mb-4 border px-4" />
        </div>

        <div className="flex lg:flex-row flex-col mx-4">
          <div className="w-full lg:w-8/12 sm:p-2 sm:pl-4 sm:pr-11 ">
            <h1 className="text-base ssm:text-lg sm:text-2xl">
              {proposalData?.title}
            </h1>
            <div className="flex items-center my-3">
              <p
                className={`rounded-full px-2 p-1 mr-3 sm:text-base text-sm ${color} ${bgColor} `}
              >
                {proposalData?.status}
              </p>
              {/* <Tooltip content={creator} position={"top"}>
                <Blockie seed={creator} size={6} />
              </Tooltip> */}
              <p className="px-2 sm:text-base text-sm">
                {creator?.substring(0, 4)}...
                {creator?.substring(creatorLength - 4, creatorLength)}
              </p>
            </div>
            <div className="mt-4 ">
              <h1 className=" text-base sm:text-lg py-2 text-gray-700">
                Description
              </h1>
              <p className="text-gray-700 sm:text-base ss:text-sm text-[12px]">
                {proposalData?.description}
              </p>
            </div>

            <div className="w-full flex justify-center lg:justify-start">
              {proposalData?.proposalType == "0" &&
                proposalData?.status != "Closed" &&
                accountStatus == "connected" && (
                  <SingleChoiceVote
                    indexToVotingPower={indexToVotingPower}
                    setIndexToVotingPower={setIndexToVotingPower}
                    options={proposalData?.optionsArray}
                    voteText={sVoteText}
                    isVoting={isVotingS}
                    isFetching={false}
                    isLoading={false}
                    // isLoading={isLoadingS}
                    handleSingleVote={handleSingleVote}
                    // handleSingleVote={handleSingleVote}
                  />
                )}
              {proposalData?.proposalType == "2" &&
                proposalData?.status != "Closed" && (
                  <QuadraticVote
                    votingPower={votingPower}
                    options={proposalData?.optionsArray}
                    handleVote={handleVote}
                    setVotingPower={setVotingPower}
                    voteText={sVoteText}
                    isVoting={isVotingS}
                    isFetching={false}
                    // isFetching={isFetchingQ}
                    isLoading={false}
                    // isLoading={isLoadingQ}
                  />
                )}
              {proposalData?.proposalType == "1" &&
                proposalData?.status != "Closed" &&
                accountStatus == "connected" && (
                  <QuadraticVote
                    votingPower={votingPower}
                    options={proposalData?.optionsArray}
                    handleVote={handleVote}
                    setVotingPower={setVotingPower}
                    voteText={sVoteText}
                    isVoting={isVotingS}
                    isFetching={false}
                    // isFetching={isFetchingQ}
                    isLoading={false}
                    // isLoading={isLoadingQ}
                  />
                )}
            </div>

            <div className="w-full flex justify-center lg:justify-start">
              {proposalData?.allVoters && (
                <VotersTable
                  allVoters={proposalData?.allVoters}
                  options={proposalData?.optionsArray}
                />
              )}
            </div>
          </div>

          <div className="flex lg:flex-col sm:flex-row flex-col items-center justify-center lg:justify-start lg:w-4/12 rounded-md  text-sm">
            <div className="shadow bg-white p-3 mt-8 w-full justify-center sm:w-5/12 lg:w-10/12">
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
    </div>
  );
};

ID.getLayout = function getLayout(page: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined) {
  return <Layout>{page}</Layout>;
};

export default ID;

export async function getServerSideProps({ params }: IParam) {
  // Fetch necessary data for the blog post using params.id
  const proposal = await getProposalsData(params.id);

  console.log("INside serverside prpos:::", proposal);

  return {
    props:
      {
        proposal: proposal || null,
      } || null,
  };
}
