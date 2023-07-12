import { useContext } from 'react';
import ProposalsContext from '../providers/proposals-context';

const useProposals = () => {
    return useContext(ProposalsContext);
};

export default useProposals;
