import { BigNumber, ethers } from 'ethers';
import React from 'react';

interface IProposalsContext {
    allProposals: any,
    larBalance: string,
    chainId: null,
    loadAllProposals: () => Promise<any> | null,
    loadLarBalance: (address: string) => Promise<string> | null,
    loadChainId: () => Promise<number> | null,


}

const ProposalsContext = React.createContext<IProposalsContext>({
    allProposals:  null,
    larBalance: "",
    chainId: null,
    loadAllProposals: () => null,
    loadLarBalance: () => null,
    loadChainId: () => null,
    
})    

export default ProposalsContext;
