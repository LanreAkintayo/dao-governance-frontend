import Moralis from "moralis/node"
import { abi, contractAddresses } from "../constants";
import { now, toMilliseconds } from "../utils/helper";


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_APP_ID;
const masterKey = process.env.NEXT_PUBLIC_MASTER_KEY;

const daoAddresses = contractAddresses["80001"];
const contractAddress = daoAddresses[daoAddresses.length - 1]

export interface Proposal {
  id: string;
  creator: string;
  description: string;
  duration: number;
  proposalStatus: string;
  proposalType: string;
  latestOptions: string[][] | undefined;
  startDate: number;
  endDate: number;
  status: string;
  timeLeft: number;
  title: string;
  optionsArray: {
    optionIndex: string,
    optionText: string,
    optionVote: string,
    optionPercentage: string,
  }[],
  validOptions: string[][],
  allVoters:any[][]
}


export async function getProposalsId() {
  try{
    await Moralis.start({ serverUrl, appId, masterKey });

    console.log("Now here")
  
        const Proposals = Moralis.Object.extend("Proposals");
        const proposalsQuery = new Moralis.Query(Proposals);
        proposalsQuery.descending("uid_decimal");
  
        const proposals = await proposalsQuery.find();
  
        const proposalsId = proposals.map(async (proposal) => {
          const proposalAttribute = proposal.attributes
          return {
            params: {
              id: proposalAttribute.uid
            }
          }})
         
          return await Promise.all(proposalsId);
  } catch(err) {
    console.log(err)
  }
 
}
const getLatestOptions = async (id: string): Promise<Array<string[]>> => {
  const AllVotes: string = Moralis.Object.extend("Votes");
  const votesQuery = new Moralis.Query(AllVotes);

  votesQuery.descending("block_timestamp");
  votesQuery.equalTo("uid", id);

  const lastVote = await votesQuery.first();

  const latestOptions = lastVote?.attributes.proposalOptions;
  return latestOptions;
};

const getTotalVotes = (options: Array<Array<string>>): number => {
  let totalVotes: number = 0;
  options.forEach((option) => {
    totalVotes += Number(option[2]);
  });
  return totalVotes;
};


export async function getProposalsData(id:string){
  try {
    await Moralis.start({ serverUrl, appId, masterKey });

  const Proposals = Moralis.Object.extend("Proposals");
  const proposalsQuery = new Moralis.Query(Proposals);
  proposalsQuery.equalTo("uid", id);
  const proposal = await proposalsQuery.first();

  const proposalAttribute = proposal?.attributes;

    const latestOptions = await getLatestOptions(proposalAttribute?.uid);
    const validOptions: Array<Array<string>> =
      latestOptions == undefined
        ? proposalAttribute?.options
        : latestOptions;
    
     

      const options = {
        chain: '0x13881',
        address: contractAddress,
        function_name: "getVoters",
        abi: abi,
        params: { id },
      };
      const allVoters = await Moralis.Web3API.native.runContractFunction(options);

      console.log("These are all voters: ", allVoters)

    const totalVotes = getTotalVotes(validOptions);

    const optionsArray = validOptions.map((option) => {
      console.log("Option 2: ", option[2]);
      const percentage =
        totalVotes != 0 ? ((Number(option[2]) / totalVotes) * 100).toFixed(1) : 0;

      return {
        optionIndex: option[0],
        optionText: option[1],
        optionVote: option[2],
        optionPercentage: percentage.toString(),
      };
    });

    const startDate: number = toMilliseconds(
      Number(proposalAttribute?.startDate)
    );
    const duration: number = toMilliseconds(
      Number(proposalAttribute?.duration)
    );
    const endDate: number = startDate + duration;

    const timeLeft: number =
      startDate + duration - now() < 0 ? 0 : startDate + duration - now();
    let status: string;

    if (now() > endDate) {
      status = "Closed";
    } else if (now() > startDate) {
      status = "Active";
    } else {
      status = "Pending";
    }

    const finalProposal:Proposal = {
      id: proposalAttribute?.uid,
      creator: proposalAttribute?.creator,
      description: proposalAttribute?.description,
      duration: proposalAttribute?.duration,
      proposalStatus: proposalAttribute?.proposalStatus,
      proposalType: proposalAttribute?.proposalType,
      latestOptions: latestOptions || null,
      startDate,
      endDate,
      status,
      timeLeft,
      title: proposalAttribute?.title,
      optionsArray,
      validOptions,
      allVoters
    };

    // console.log("Final proposal: ", finalProposal)

    return finalProposal
  } catch (error) {
    console.log(error)
  }
  

}

