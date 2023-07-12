import { BigNumber } from 'ethers/lib/ethers';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';


export type NextPageWithLayout<P = {}> = NextPage<P> & {
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

export type Request = { body: { address: any; chain: any; network: any; }; }
export type Response = { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: unknown; }): void; new(): any; }; }; }