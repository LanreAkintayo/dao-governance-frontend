import React, { useReducer } from 'react';
import { BigNumber, ethers } from 'ethers';

import ProposalsContext from './proposals-context';
import {
  getAccount,
  getNetwork,
  switchNetwork,
  readContract,
  getContract,
  fetchBalance,
} from '@wagmi/core';

import { erc20ABI } from 'wagmi';
import { daoAbi, daoAddress } from '../constants';

const defaultWeb3State = {
  allProposals: null
};

const web3Reducer = (
  state: any,
  action: {
    type: string;
   allProposals?: any;
  }
) => {
  
  
  if (action.type === 'ALL_PROPOSALS') {
    return {
      ...state,
      allProposals: action.allProposals,
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

    const allProposals = await readContract({
      address: daoAddress,
      abi: daoAbi,
      functionName: 'getProposalsArray',
    });

    // const finalizedProposal = allProposals.map((proposal) => {


    //   // const optionsArray = proposal.options.map((option) => {
    //   //   // console.log("Option 2: ", option[2]);
    //   //   const percentage =
    //   //     totalVotes != 0
    //   //       ? ((Number(option[2]) / totalVotes) * 100).toFixed(1)
    //   //       : 0;

    //   //   // option = [optionIndex, optionText, optionVote, optionPercentage]
    //   //   // validOptions = [option1, option2]

    //   //   return {
    //   //     optionIndex: option[0],
    //   //     optionText: option[1],
    //   //     optionVote: option[2],
    //   //     optionPercentage: percentage.toString(),
    //   //   };
    //   // });
      
    
    // })


  
    /*
    
    
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


    
    */

    console.log("All Proposals: ", allProposals)

    // const allProposals = "These are all the proposals"
 

    dispatchWeb3Action({ type: 'ALL_PROPOSALS', allProposals });
  };

  const web3Context = {
    allProposals: web3State.allProposals,
    loadAllProposals: loadAllProposalsHandler
  };

  return (
    <ProposalsContext.Provider value={web3Context}>
      {props.children}
    </ProposalsContext.Provider>
  );
};

export default ProposalsProvider;
