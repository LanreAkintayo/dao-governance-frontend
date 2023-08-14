import type { NextPage } from "next";
import Footer from "../components/Footer";
import ProposalCard from "../components/ProposalCard";
import { ScaleLoader } from "react-spinners";
import useProposals from "../hooks/useProposals";
import Layout from "../components/Layout";
import { NextPageWithLayout, Proposal } from "../types";

const AllProposals: NextPageWithLayout = () => {
  const { allProposals } = useProposals();
  console.log("Are there proposals?", allProposals == null);

  console.log("All Proposals: ", allProposals);

  return (
    <div className={`flex flex-col mb-8 justify-between`}>
      <div>
        <section className="px-5 mt-24 flex flex-col items-center ">
          <div className=" lg:w-9/12 w-11/12">
            <h1 className="text-xl text-gray-700 pt-4 ">All Proposals</h1>

            {allProposals?.map((proposal: Proposal) => {
              return <ProposalCard proposal={proposal} key={proposal.id} />;
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

AllProposals.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AllProposals;
