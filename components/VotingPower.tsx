import { useMoralis } from "react-moralis";
import useSWR from "swr";
import {ethers} from "ethers"
import { erc20Abi, larAddress } from "../constants";
import { fromWei, inDollarFormat } from "../utils/helper";

export default function VotingPower({className}) {

    const {isWeb3Enabled, enableWeb3, account} = useMoralis()

    const {
        data: larBalance,
        error,
        mutate,
      } = useSWR(
        () => (isWeb3Enabled ? "web3/votingPower" : null),
        async () => {
            const provider = await enableWeb3();

            const lar = new ethers.Contract(larAddress, erc20Abi, provider);
            const votingPowerBalance: string = await lar.balanceOf(account);

            return inDollarFormat(Number(fromWei(votingPowerBalance)))
        }
      );


  return (
    <div className={`${className} bg-white p-2 rounded-full text-xs `}>
        {larBalance && <p className="whitespace-nowrap">Voting Power: {larBalance} LAR</p>}
      
    </div>
  );
}
