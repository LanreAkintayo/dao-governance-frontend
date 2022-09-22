import { NextPage } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ResultSection from "../../components/ResultSection";
import { getProposalsId, getProposalsData } from "../../lib/fetchProposals";
import { formatTime } from "../../utils/helper";

const Proposal: NextPage = ({ proposal }) => {
  interface VotingSystem {
    [key: string]: string;
  }
  const votingSystem = {
    0: "Single Choice Voting",
    1: "Weighted Voting",
    2: "Quadratic Voting",
  };

  const proposalsType: string = proposal.proposalType;
  const proposalVotingSystem: string = votingSystem[proposalsType];
  const startDate = formatTime(proposal.startDate);
  const endDate = formatTime(proposal.endDate);

  return (
    <div className="flex flex-col justify-between bg-gray-50 h-full">
      <div>
        <Header />
        <div className="flex mt-24 mx-4">
          <div className="w-8/12 p-2 pl-4 pr-11 ">
            <h1 className="text-2xl">{proposal.title}</h1>

            <div className="mt-4 ">
              <h1 className="text-lg text-gray-700">Description</h1>
              <p className="text-gray-700">{proposal.description}</p>
            </div>

            <div className="shadow bg-white p-3 pb-5 mt-4 w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Cast your Vote
              </h1>
              <div>
                <div className="w-full h-full text-center items-center">
                  <p className="rounded-md p-2 bg-blue-100 text-blue-900 text-xl">
                    No
                  </p>
                  <p className="mt-2 rounded-md p-2  bg-blue-100 text-blue-900 text-xl">
                    Yes
                  </p>
                  <p className="mt-2 rounded-md p-2 bg-blue-400 text-white text-xl">
                    Vote
                  </p>
                </div>
              </div>
            </div>

            <table className="mt-10 w-10/12 self-center table-fixed rounded-lg shadow text-sm text-left ">
              <thead className=" rounded-lg bg-gray-50">
                <tr className="text-white bg-blue-400">
                  <th scope="col" colSpan={3} className="py-3 pl-3">
                    List of Voters
                  </th>
                </tr>
              </thead>

              <tbody className="">
                <tr className="bg-white border-t border-gray-300">
                  <td className="py-4 pl-3">0xdd4f32....9b124</td>
                  <td className="pl-3">No</td>
                  <td className="pl-3 ">43,432 LAR</td>
                </tr>
                <tr className="bg-white border-t border-gray-300">
                  <td className="py-4 pl-3">0xdd4f32....9b124</td>
                  <td className="pl-3">Yes</td>
                  <td className="pl-3 ">43,432 LAR</td>
                </tr>
                <tr className="bg-white border-t border-gray-300">
                  <td className="py-4 pl-3">0xdd4f32....9b124</td>
                  <td className="pl-3">Yes</td>
                  <td className="pl-3 ">43,432 LAR</td>
                </tr>
                <tr className="bg-white border-t border-gray-300">
                  <td className="py-4 pl-3">0xdd4f32....9b124</td>
                  <td className="pl-3">Yes</td>
                  <td className="pl-3 ">43,432 LAR</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-4/12 rounded-md  text-sm">
            <div className="shadow bg-white p-3 w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Information
              </h1>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Voting System</p>
                <p>{votingSystem[proposal.proposalType]}</p>
              </div>
              <div className="flex pt-2 items-center justify-between">
                <p className="text-gray-700">Start Date</p>
                <p>{startDate}</p>
              </div>
              <div className="flex pt-2 items-center justify-between">
                <p className="text-gray-700">End Date</p>
                <p>{endDate}</p>
              </div>
            </div>

            <ResultSection options={proposal.optionsArray}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  console.log("We are here");
  const paths = await getProposalsId();

  console.log("Paths", paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const proposal = await getProposalsData(params.id);
  return {
    props: {
      proposal,
    },
  };
}
export default Proposal;
