import type { NextPage } from "next";
import Footer from "../components/Footer";
import ProposalCard from "../components/ProposalCard";
import { ScaleLoader } from "react-spinners";
import useProposals from "../hooks/useProposals";
import Layout from "../components/Layout";
import { NextPageWithLayout, Proposal } from "../types";

const AllProposals: NextPageWithLayout = () => {
  const { allProposals } = useProposals();
  // console.log("Are there proposals?", allProposals == null)

  // console.log("All Proposals: ", allProposals);

  return (
    <div className={`flex flex-col mb-8 justify-between`}>
      <div>
        <section className="px-1 sm:px-5 mt-12 sm:mt-24 flex flex-col items-center ">
          <div className=" lg:w-9/12 w-11/12">
            <h1 className="text-xl text-gray-700 pt-4 ">All Proposals</h1>

            {allProposals == null ? (
              <div className="flex flex-col w-full my-4 items-center">
                <div className="my-1">
                  <ScaleLoader color="black" loading={true} />
                </div>

                <p className="text-gray-500">Please Wait a few seconds</p>
              </div>
            ) : allProposals && allProposals?.length == 0 ? (
              <div className="w-full text-center">
                <p className="my-12">No Proposals at the moment</p>
              </div>
            ) : (
              <div>
                {allProposals?.map((proposal: Proposal) => {
                  return <ProposalCard proposal={proposal} key={proposal?.id} />;
                })}
              </div>
            )}
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
