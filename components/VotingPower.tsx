import { useMoralis } from "react-moralis";
import useSWR from "swr";
import { ethers, BigNumber } from "ethers";
import { abi, erc20Abi, larAddress } from "../constants";
import { fromWei, inDollarFormat } from "../utils/helper";

export default function VotingPower({ className }: { className: string }) {
  const { isWeb3Enabled, enableWeb3, account, Moralis } = useMoralis();

  const {
    data: larBalance,
    error,
    mutate,
  } = useSWR(
    () => (isWeb3Enabled ? "web3/votingPower" : null),
    async () => {

      console.log("Fetcing voting power:.....")

      const balanceOptions = {
        contractAddress: larAddress,
        functionName: "balanceOf",
        abi: erc20Abi,
        params: {
          account:account
        },
      };

      console.log("About to execute the function")

      const votingPowerBalance = (await Moralis.executeFunction(balanceOptions)) as unknown as BigNumber

      console.log("Balance: ", votingPowerBalance)


      // console.log("This is for all the votersvoters: ", allVoters)
      

      // const provider = await enableWeb3();

      // const lar = new ethers.Contract(larAddress, erc20Abi, provider);
      // const votingPowerBalance: string = await lar.balanceOf(account);


      // console.log("Balance: ", votingPowerBalance)

      return inDollarFormat(Number(fromWei(votingPowerBalance)));
    }
  );

  return (
    <div className={`${className} bg-white p-2 rounded-full text-xs `}>
      {larBalance && (
        <p className="whitespace-nowrap">Voting Power: {larBalance} LAR</p>
      )}
    </div>
  );
}
