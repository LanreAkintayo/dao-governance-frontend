import { BigNumber, ethers } from 'ethers';
import React from 'react';

interface IProposalsContext {
    allProposals: any,
    larBalance: string,
    loadAllProposals: () => Promise<any> | null,
    loadLarBalance: (address: string) => Promise<string> | null,


}

const ProposalsContext = React.createContext<IProposalsContext>({
    allProposals:  null,
    larBalance: "",
    loadAllProposals: () => null,
    loadLarBalance: () => ""
})    

export default ProposalsContext;
