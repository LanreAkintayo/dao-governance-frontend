import type { NextPage } from "next";
import Footer from "../components/Footer";
import ProposalCard from "../components/ProposalCard";
import { ScaleLoader } from "react-spinners";
import useProposals from "../hooks/useProposals";
import Layout from "../components/Layout";
import { NextPageWithLayout, Proposal } from "../types";


const AllProposals: NextPageWithLayout = () => {
 
  const { allProposals } = useProposals()
  
  console.log("All Proposals: ", allProposals)

  return (
   <div>This is a simple page</div>
  );
};



AllProposals.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


export default AllProposals;
