import React, { useReducer } from "react";
import ProposalsContext from "./proposals-context";
import {
  readContract,
  getNetwork
} from "@wagmi/core";
import { daoAbi, daoAddress, erc20Abi, larAddress } from "../constants";
import { now, toMilliseconds } from "../utils/helper";
import { IOriginalProposal } from "../types";

const defaultWeb3State = {
  allProposals: null,
  larBalance: "",
  chainId: null
};

const web3Reducer = (
  state: any,
  action: {
    type: string;
    allProposals?: any;
    larBalance?:any;
    chainId?: any;
  }
) => {
  if (action.type === "ALL_PROPOSALS") {
    return {
      ...state,
      allProposals: action.allProposals,
    };
  }
  if (action.type === "LAR_BALANCE") {
    return {
      ...state,
      larBalance: action.larBalance,
    };
  }
  if (action.type === "CHAIN_ID") {
    return {
      ...state,
      chainId: action.chainId,
    };
  }

  return defaultWeb3State;
};

const ProposalsProvider = (props: any) => {
  const [web3State, dispatchWeb3Action] = useReducer(
    web3Reducer,
    defaultWeb3State
  );

  const loadChainIdHandler = async () => {

    const { chain, chains } = getNetwork()
    let chainId = -1

    if (chain){

      chainId = chain.id;

      dispatchWeb3Action({
        type: "CHAIN_ID",
        chainId: chainId
      });
  
  
      
    }
    return chainId

   

  }

  const loadAllProposalsHandler = async () => {
    // Let's fetch all proposals

    const allProposals = await readContract({
      address: daoAddress,
      abi: daoAbi,
      functionName: "getProposalsArray",
    }) as IOriginalProposal[]

    // console.log("All Proposals: ", allProposals)

    const finalizedProposals = allProposals.map((proposal) => {
      let totalVotes: number = 0;
      const options = proposal.options;


      // console.log("Options::::", options);

      // Get the total votes
      options.forEach((option) => {
        totalVotes += Number(option.vote);
      });

      // console.log("Total votes: ", totalVotes);

      const optionsArray = options.map((option) => {
        // console.log(option.vote);
        const percentage =
          totalVotes != 0
            ? ((Number(option.vote) / totalVotes) * 100).toFixed(1)
            : 0;

        return {
          optionIndex: option.index,
          optionText: option.optionText,
          optionVote: option.vote,
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
        startDate,
        endDate,
        duration,
        status,
        optionsArray,
      };
    });

    finalizedProposals.sort((proposal1, proposal2) =>  proposal2.startDate - proposal1.startDate);

    dispatchWeb3Action({
      type: "ALL_PROPOSALS",
      allProposals: finalizedProposals,
    });
  };

  const loadLarBalanceHandler = async (address: string | `0x${string}`) => {
    const larBalance: string = await readContract({
      address: larAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address]
    }) as string


    dispatchWeb3Action({
      type: "LAR_BALANCE",
      larBalance: larBalance
    });

    return larBalance


  
  }

  const web3Context = {
    allProposals: web3State.allProposals,
    larBalance: web3State.larBalance,
    chainId: web3State.chainId,
    loadAllProposals: loadAllProposalsHandler,
    loadLarBalance: loadLarBalanceHandler,
    loadChainId: loadChainIdHandler
  };

  return (
    <ProposalsContext.Provider value={web3Context}>
      {props.children}
    </ProposalsContext.Provider>
  );
};

export default ProposalsProvider;
