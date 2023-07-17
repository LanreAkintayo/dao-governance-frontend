import React, { useReducer } from "react";
import { BigNumber, ethers } from "ethers";

import ProposalsContext from "./proposals-context";
import {
  getAccount,
  getNetwork,
  switchNetwork,
  readContract,
  getContract,
  fetchBalance,
} from "@wagmi/core";

import { erc20ABI } from "wagmi";
import { daoAbi, daoAddress, erc20Abi, larAddress } from "../constants";
import { now, toMilliseconds } from "../utils/helper";

const defaultWeb3State = {
  allProposals: null,
  larBalance: ""
};

const web3Reducer = (
  state: any,
  action: {
    type: string;
    allProposals?: any;
    larbalance?:any;
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

  return defaultWeb3State;
};

const ProposalsProvider = (props: any) => {
  const [web3State, dispatchWeb3Action] = useReducer(
    web3Reducer,
    defaultWeb3State
  );

  const loadAllProposalsHandler = async () => {
    // Let's fetch all proposals

    const allProposals: any[] = await readContract({
      address: daoAddress,
      abi: daoAbi,
      functionName: "getProposalsArray",
    });

    console.log("All Proposals: ", allProposals)

    const finalizedProposals = allProposals.map((proposal) => {
      let totalVotes: number = 0;
      const options = proposal.options;


      console.log("Options::::", options);

      // Get the total votes
      options.forEach((option) => {
        totalVotes += Number(option.vote);
      });

      console.log("Total votes: ", totalVotes);

      const optionsArray = options.map((option) => {
        console.log(option.vote);
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
    loadAllProposals: loadAllProposalsHandler,
    loadLarBalance: loadLarBalanceHandler
  };

  return (
    <ProposalsContext.Provider value={web3Context}>
      {props.children}
    </ProposalsContext.Provider>
  );
};

export default ProposalsProvider;
