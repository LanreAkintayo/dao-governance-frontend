import type { NextPage } from "next";
import Footer from "../components/Footer";
import ProposalCard from "../components/ProposalCard";
import { ScaleLoader } from "react-spinners";
import useProposals from "../hooks/useProposals";
import Layout from "../components/Layout";
import { NextPageWithLayout, Proposal } from "../types";


const Proposals: NextPageWithLayout = () => {
 
 const {allProposals} = useProposals()

  return (
    <div
      className={`flex flex-col ${
        (!allProposals || allProposals?.length == 0) && "h-screen"
      } justify-between  bg-gray-50`}
    >
      <div>
        <section className="px-5 mt-24 flex flex-col items-center ">
          
          <div className=" lg:w-9/12 w-11/12">
            <h1 className="text-xl text-gray-700 pt-4 ">All Proposals</h1>

            {!allProposals  && (
              <div className="flex flex-col w-full my-4 items-center">
                <div className="my-1">
                  <ScaleLoader color="black" loading={true} />
                </div>

                <p className="text-gray-500">Please Wait a few seconds</p>
              </div>
            )}
            {!true && (
              <div className="flex flex-col my-4 p-2 text-orange-800 jusify-center items-center">
                <p className="text-center p-2 px-10 w-96 bg-orange-200">
                  Connect Your Wallet
                </p>
              </div>
            )}

            {allProposals && allProposals.length == 0 && (
              <div className="w-full text-center">
                <p className="my-12">No Proposals at the moment</p>
              </div>
            )}

            {allProposals?.map((proposal: Proposal) => {
              return <ProposalCard proposal={proposal} key={proposal.id} />;
            })}
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};



Proposals.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


export default Proposals;
