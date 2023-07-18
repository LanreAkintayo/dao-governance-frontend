import { BigNumber } from 'ethers/lib/ethers';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';


export type NextPageWithLayout<P = {}, Q = {}> = NextPage<P & Q> & {
  authorization?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};


export type Reward = {
    totalRewardAmount: BigNumber;
    rewardClaimed: BigNumber;
    rewardCount: BigNumber;
    lastClaimingDay: BigNumber;
    percentageSumUp: BigNumber;
    claimCount: BigNumber;
    rewardDays: BigNumber[];
    rewardPercentages: BigNumber[];
  }


  interface ABI {
    [key:string]: any
  }
  
  export interface IOption 
    {
      optionIndex: number,
      optionText: string,
      optionVote: number,
      optionPercentage: string,
    }
  export interface IOriginalOption 
    {
      index: number;
      optionText: string;
      vote: number;
    }

    export interface IVoter {
      voterAddress: string;
      optionVotes: number[];
      optionIndexes: number[];
    }
  
  
  export interface Proposal {
    id: number;
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
    allVoters: IVoter[];
    voters?: IVoter[];
  }
  export interface IOriginalProposal {
          id: number;
          creator: string;
          title: string;
          description: string;
          proposalType: string;
          proposalStatus: string;
          startDate: number;
          duration: number;
          options: IOriginalOption[];
          voters: IVoter[];
  }
  
  export interface IParam {
    params: {
      id: number
    }
  }
  
  export interface Voter {
      voterAddress: string;
      optionIndexes: number[];
      optionVotes: number[];
  }



