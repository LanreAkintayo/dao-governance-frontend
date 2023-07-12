import { BigNumber, ethers } from 'ethers';
import React from 'react';

interface IProposalsContext {
    allProposals: any,
    loadAllProposals: () => Promise<any> | null,


}

const ProposalsContext = React.createContext<IProposalsContext>({
    allProposals:  null,
    loadAllProposals: () => null,
})    

export default ProposalsContext;
