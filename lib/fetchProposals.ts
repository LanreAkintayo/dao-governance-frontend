// import Moralis from "moralis/node"
import { daoAbi, contractAddresses, daoAddress } from "../constants";
import { IOriginalProposal, IOriginalOption, Proposal } from "../types";
import { now, toMilliseconds } from "../utils/helper";
import {
  readContract,
} from "@wagmi/core";



export const getProposalsData = async (id:number): Promise<Proposal> => {

  const proposal = await readContract({
    address: daoAddress,
    abi: daoAbi,
    functionName: "getProposals",
    args: [id]
  }) as IOriginalProposal

  // console.log("Proposal --------------> ", proposal)
  const newVoters = proposal.voters.map((voter) => {
    const optionIndexes = voter.optionIndexes.map((index) => Number(index))

    console.log("Option indexes: ", optionIndexes)
    const optionVotes = voter.optionVotes.map((vote) => Number(vote))

    console.log("Option votes: ", optionVotes)

    
  const voters = {
    voterAddress: voter.voterAddress,
    optionVotes,
    optionIndexes
  }
  return voters;
  
  })


  let totalVotes: number = 0;
  const options = proposal.options.map((option: IOriginalOption) => {
   
    return {
      index: Number(option.index),
      optionText: option.optionText,
      vote: Number(option.vote),
    };
  });



  // Get the total votes
  options.forEach((option: IOriginalOption) => {
    totalVotes += option.vote;
  });

  console.log("Total votes: ", totalVotes);

  const optionsArray = options.map((option: IOriginalOption) => {
    console.log(option.vote);
    const percentage =
      totalVotes != 0
        ? ((Number(option.vote) / totalVotes) * 100).toFixed(1)
        : 0;

    return {
      optionIndex: Number(option.index),
      optionText: option.optionText,
      optionVote: Number(option.vote),
      optionPercentage: percentage.toString(),
    };
  });
 

  let status;

  const startDate: number = toMilliseconds(Number(proposal.startDate));
  const duration: number = toMilliseconds(Number(proposal.duration));
  const endDate: number = startDate + duration;
  const timeLeft: number =
        startDate + duration - now() < 0 ? 0 : startDate + duration - now();

  if (now() > endDate) {
    status = "Closed";
  } else if (now() > startDate) {
    status = "Active";
  } else {
    status = "Pending";
  }

  console.log("Proposal: ", proposal)

  const finalizedProposal =  {
    ...proposal,
    options,
    id: Number(proposal.id),
    startDate,
    endDate,
    duration,
    status,
    optionsArray,
    allVoters: newVoters,
    voters: newVoters,
    proposalStatus: proposal.proposalStatus,
    proposalType: proposal.proposalType,
    timeLeft: timeLeft

  };


  console.log("New voters: ", newVoters[0].optionVotes, newVoters[0].optionIndexes)

  console.log('Finalized Proposal: ', finalizedProposal)

  return finalizedProposal

}

