// import Moralis from "moralis/node"
import { daoAbi, contractAddresses, daoAddress } from "../constants";
import { now, toMilliseconds } from "../utils/helper";
import {
  getAccount,
  getNetwork,
  switchNetwork,
  readContract,
  getContract,
  fetchBalance,
} from "@wagmi/core";

interface ABI {
  [key:string]: any
}

export interface IOption 
  {
    optionIndex: string,
    optionText: string,
    optionVote: string,
    optionPercentage: string,
  }
export interface IOriginalOption 
  {
    index: number;
    optionText: string;
    vote: number;
  }


export interface Proposal {
  id: string;
  creator: string;
  description: string;
  duration: number;
  proposalStatus: string;
  proposalType: string;
  startDate: number;
  endDate: number;
  status: string;
  timeLeft: number;
  title: string;
  options: IOriginalOption[];
  optionsArray: IOption[];
  allVoters:any[][]
}
export interface IOriginalProposal {
        id: number;
        creator: string;
        title: string;
        description: string;
        ProposalType: string;
        ProposalStatus: string;
        startDate: number;
        duration: number;
        options: IOriginalOption[];
        voters: {
          voterAddress: string;
          optionIndexes: number[];
          optionVotes: number[];
      }[];
}

export interface IParam {
  params: {
    id: string
  }
}

export interface Voter {
    voterAddress: string;
    optionIndexes: number[];
    optionVotes: number[];
}


type RunContractFunction =  {
  chain: "0x13881";
  address: string;
  function_name:string;
  daoAbi: ABI[];
  params: {[key:string]: any}
} 


export async function getProposalsData(id:string){

  console.log("Id is ", id);

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
  const options = proposal.options;

  // Get the total votes
  options.forEach((option: IOriginalOption) => {
    totalVotes += Number(option.vote);
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

  if (now() > endDate) {
    status = "Closed";
  } else if (now() > startDate) {
    status = "Active";
  } else {
    status = "Pending";
  }

  return {
    ...proposal,
    options: optionsArray,
    id: Number(proposal.id),
    startDate,
    endDate,
    duration,
    status,
    optionsArray,
    voters: newVoters
  };




  // const allProposals = await readContract({
  //   address: daoAddress,
  //   abi: daoAbi,
  //   functionName: "getProposalsArray",
  // }) as Proposal[]

  // const finalizedProposals = allProposals.map((proposal) => {
  //   let totalVotes: number = 0;
  //   const options = proposal.options;

  //   // Get the total votes
  //   options.forEach((option: IOriginalOption) => {
  //     totalVotes += Number(option.vote);
  //   });

  //   console.log("Total votes: ", totalVotes);

  //   const optionsArray = options.map((option: IOriginalOption) => {
  //     console.log(option.vote);
  //     const percentage =
  //       totalVotes != 0
  //         ? ((Number(option.vote) / totalVotes) * 100).toFixed(1)
  //         : 0;

  //     return {
  //       optionIndex: Number(option.index),
  //       optionText: option.optionText,
  //       optionVote: Number(option.vote),
  //       optionPercentage: percentage.toString(),
  //     };
  //   });

  //   let status;

  //   const startDate: number = toMilliseconds(Number(proposal.startDate));
  //   const duration: number = toMilliseconds(Number(proposal.duration));
  //   const endDate: number = startDate + duration;

  //   if (now() > endDate) {
  //     status = "Closed";
  //   } else if (now() > startDate) {
  //     status = "Active";
  //   } else {
  //     status = "Pending";
  //   }

  //   return {
  //     ...proposal,
  //     options: optionsArray,
  //     id: Number(proposal.id),
  //     startDate,
  //     endDate,
  //     duration,
  //     status,
  //     optionsArray,
  //   };
  // });

  // return finalizedProposals[Number(id)]

}

